import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error
# Load dataset
df = pd.read_csv("datasets/cleaned_dataset.csv")
#added to epoch3
df["Time"] = pd.to_datetime(df["Time"])
df["weekday"] = df["Time"].dt.weekday
df["quarter"] = df["Time"].dt.quarter
# Features(they act as the independent variables and input for the mdoel)
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
        "quarter"
    ]
]
# Target(energy is the targeet variable and also dependent var)
y = df["Energy delta[Wh]"]
# Train/Test Splitting the dsta
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
# Model rfr
model = RandomForestRegressor(
    n_estimators=1000,
    max_depth=None,
    min_samples_leaf=1,
    min_samples_split=2,
    random_state=42,
    n_jobs=-1
)
# Training the model
model.fit(X_train, y_train)
# Prediction
predictions = model.predict(X_test)
# Evaluating the scoree for our mdoel rf
score = r2_score(y_test, predictions)
print("R2 Score:", score)
#okay epoch1 gave me a 0.86 r**2 score, and the below code is to understand the features importance
feature_importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})
feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)
print(feature_importance)
mae = mean_absolute_error(y_test, predictions)

#plotting the actual vs predicted vluse on a scatter plot
plt.figure(figsize=(8,6))
plt.scatter(y_test, predictions, alpha=0.3)
plt.xlabel("Actual Energy")
plt.ylabel("Predicted Energy")
plt.title("Actual vs Predicted Energy")
print("MAE:", mae)
plt.show()