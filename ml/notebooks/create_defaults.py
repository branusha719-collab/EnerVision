import pandas as pd
import json

df = pd.read_csv("../datasets/cleaned_dataset.csv")

defaults = {
    "pressure": float(df["pressure"].mean()),
    "wind_speed": float(df["wind_speed"].mean()),
    "clouds_all": float(df["clouds_all"].mean()),
    "sunlightTime": float(df["sunlightTime"].mean()),
    "dayLength": float(df["dayLength"].mean()),
    "energy_mean": float(df["Energy delta[Wh]"].mean())
}

with open("../models/feature_defaults.json", "w") as f:
    json.dump(defaults, f, indent=4)

print("Defaults saved successfully")