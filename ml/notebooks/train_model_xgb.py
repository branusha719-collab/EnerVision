import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
import os
from sklearn.metrics import r2_score, mean_absolute_error
from xgboost import XGBRegressor

# Load data
df = pd.read_csv("datasets/cleaned_dataset.csv")
df["Time"] = pd.to_datetime(df["Time"])
df = df.sort_values("Time").reset_index(drop=True)

print("Total rows:", len(df))
# Basic time features
df["hour"] = df["Time"].dt.hour
df["month"] = df["Time"].dt.month
df["weekday"] = df["Time"].dt.weekday

df["hour_sin"] = np.sin(2 * np.pi * df["hour"] / 24)
df["hour_cos"] = np.cos(2 * np.pi * df["hour"] / 24)

df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)

# Interaction features
df["ghi_temp"] = df["GHI"] * df["temp"]
df["ghi_clouds"] = df["GHI"] * df["clouds_all"]
df["ghi_humidity"] = df["GHI"] * df["humidity"]

# =========================
# LAG FEATURES (SAFE)
# =========================
df["energy_lag_1"] = df["Energy delta[Wh]"].shift(1)
df["energy_lag_2"] = df["Energy delta[Wh]"].shift(2)

df["ghi_lag_1"] = df["GHI"].shift(1)
df["temp_lag_1"] = df["temp"].shift(1)

# =========================
# SAFE ROLLING FEATURES (NO LEAKAGE)
# IMPORTANT: SHIFT BEFORE ROLLING
# =========================
df["energy_roll_mean_3"] = df["Energy delta[Wh]"].shift(1).rolling(3).mean()
df["ghi_roll_mean_3"] = df["GHI"].shift(1).rolling(3).mean()
df["ghi_roll_mean_6"] = df["GHI"].shift(1).rolling(6).mean()

# Drop NaNs created by shifting/rolling
df = df.dropna().reset_index(drop=True)

# =========================
# FEATURES
# =========================
X = df[[
    "GHI",
    "temp",
    "pressure",
    "humidity",
    "wind_speed",
    "clouds_all",
    "sunlightTime",
    "dayLength",

    "hour_sin",
    "hour_cos",
    "month_sin",
    "month_cos",
    "weekday",

    "ghi_temp",
    "ghi_clouds",
    "ghi_humidity",

    "energy_lag_1",
    "energy_lag_2",
    "ghi_lag_1",
    "temp_lag_1",

    "ghi_roll_mean_3",
    "ghi_roll_mean_6",
    "energy_roll_mean_3"
]]

y = df["Energy delta[Wh]"]

# =========================
# TIME-BASED SPLIT (NO LEAKAGE)
# =========================
split_index = int(len(df) * 0.8)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

# =========================
# MODEL (STABLE CONFIG)
# =========================
model = XGBRegressor(
    n_estimators=2000,
    max_depth=5,
    learning_rate=0.03,
    subsample=0.8,
    colsample_bytree=0.8,
    min_child_weight=5,
    gamma=0.1,
    reg_alpha=0.1,
    reg_lambda=1,
    objective="reg:squarederror",
    random_state=42
)

# Train
model.fit(
    X_train,
    y_train,
    eval_set=[(X_test, y_test)],
    verbose=False
)
# Create models directory if it doesn't exist
os.makedirs("models", exist_ok=True)

# Save trained model
joblib.dump(model, "models/solar_model.pkl")

print("✅ Model saved to models/solar_model.pkl")

# Predict
predictions = model.predict(X_test)

# Metrics
r2 = r2_score(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)

print("R2 Score:", r2)
print("MAE:", mae)

# Feature importance
feature_importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
}).sort_values(by="Importance", ascending=False)

print(feature_importance)

# Plot
plt.figure(figsize=(8, 6))
plt.scatter(y_test, predictions, alpha=0.3)
plt.xlabel("Actual Energy")
plt.ylabel("Predicted Energy")
plt.title("XGBoost: Actual vs Predicted Energy")
plt.savefig("models/prediction_plot.png")
plt.close()

print("✅ Plot saved to models/prediction_plot.png")