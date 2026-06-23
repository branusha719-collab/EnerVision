import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.metrics import r2_score
from xgboost import XGBRegressor

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv("datasets/cleaned_dataset.csv")

# Time Features
df["Time"] = pd.to_datetime(df["Time"])

df["weekday"] = df["Time"].dt.weekday
df["quarter"] = df["Time"].dt.quarter

df["hour_sin"] = np.sin(2 * np.pi * df["hour"] / 24)
df["hour_cos"] = np.cos(2 * np.pi * df["hour"] / 24)

df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)

# Best feature set so far

X = df[
    [
        "GHI",
        "temp",
        "pressure",
        "humidity",
        "wind_speed",
        "rain_1h",
        "clouds_all",
        "sunlightTime",
        "dayLength",
        "hour",
        "month",
        "day",
        "year",
        "weekday",
        "quarter",
        "hour_sin",
        "hour_cos",
        "month_sin",
        "month_cos"
    ]
]

y = df["Energy delta[Wh]"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================
# Hyperparameter Search
# ==========================

param_grid = {
    "n_estimators": [500, 800, 1000, 1200, 1500, 2000],
    "max_depth": [6, 8, 10, 12],
    "learning_rate": [0.01, 0.02, 0.03, 0.05],
    "subsample": [0.8, 0.9, 1.0],
    "colsample_bytree": [0.8, 0.9, 1.0]
}

xgb = XGBRegressor(
    objective="reg:squarederror",
    random_state=42
)

search = RandomizedSearchCV(
    estimator=xgb,
    param_distributions=param_grid,
    n_iter=20,
    scoring="r2",
    cv=3,
    verbose=2,
    random_state=42,
    n_jobs=-1
)

search.fit(X_train, y_train)

print("\nBest Parameters:")
print(search.best_params_)

best_model = search.best_estimator_

predictions = best_model.predict(X_test)

r2 = r2_score(y_test, predictions)

print("\nFinal Test R2:", r2)