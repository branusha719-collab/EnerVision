const express = require("express");

const router = express.Router();

const generateFeatures =
  require("../utils/featureGenerator");

const predict =
  require("../utils/simulation");

router.post(
  "/predict",
  (req, res) => {
    try {
      const {
        ghi,
        temperature,
        humidity
      } = req.body;

      const features =
        generateFeatures(
          ghi,
          temperature,
          humidity
        );

      const prediction =
        predict(features);

      res.json({
        prediction,
        confidence: 88,
        features_used: features
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;