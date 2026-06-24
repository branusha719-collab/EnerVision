function predict(features) {
  const prediction =
    features.GHI * 0.05 +
    features.temp * 0.3 -
    features.humidity * 0.08;

  return Math.max(
    prediction,
    0
  ).toFixed(2);
}

module.exports = predict;