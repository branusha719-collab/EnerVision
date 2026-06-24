const defaults = require("../data/feature_defaults.json");

function generateFeatures(
  ghi,
  temperature,
  humidity
) {
  const now = new Date();

  const hour = now.getHours();
  const month = now.getMonth() + 1;
  const weekday = now.getDay();

  const hourSin =
    Math.sin((2 * Math.PI * hour) / 24);

  const hourCos =
    Math.cos((2 * Math.PI * hour) / 24);

  const monthSin =
    Math.sin((2 * Math.PI * month) / 12);

  const monthCos =
    Math.cos((2 * Math.PI * month) / 12);

  return {
    GHI: ghi,
    temp: temperature,
    humidity: humidity,

    pressure: defaults.pressure,
    wind_speed: defaults.wind_speed,
    clouds_all: defaults.clouds_all,
    sunlightTime: defaults.sunlightTime,
    dayLength: defaults.dayLength,

    hour_sin: hourSin,
    hour_cos: hourCos,
    month_sin: monthSin,
    month_cos: monthCos,
    weekday: weekday,

    ghi_temp: ghi * temperature,
    ghi_humidity: ghi * humidity,
    ghi_clouds: ghi * defaults.clouds_all
  };
}

module.exports = generateFeatures;