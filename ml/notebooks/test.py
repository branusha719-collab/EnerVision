import pandas as pd
df = pd.read_csv("datasets/cleaned_dataset.csv")
print(df.head())
X = df[
    [
        "GHI",
        "temp",
        "pressure",
        "humidity",
        "wind_speed",
        "rain_1h",
        "snow_1h",
        "clouds_all",
        "isSun",
        "sunlightTime",
        "dayLength",
        "hour",
        "month",
        "day"
    ]
]
y = df["Energy delta[Wh]"]
print("Features Shape:", X.shape)
print("Target Shape:", y.shape)
print(df.describe())