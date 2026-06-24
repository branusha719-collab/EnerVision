const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  }),
);

app.use(express.json());

const predictRoute = require("./routes/predict");

app.use("/api", predictRoute);

app.get("/", (req, res) => {
  res.send("EnerVision API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});