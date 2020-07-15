const express = require("express");
const app = express();
const authRoute = require(__dirname + "/routes/auth.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use("/api/user", authRoute);
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://localhost:27017/jwtDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) throw err;
    console.log("Database connected!");
  }
);

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
