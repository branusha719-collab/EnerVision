const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("EnerVision API Running");
});

app.listen(5000);