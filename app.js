const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//Route
const user = require("./routes/userRoute");
app.use("/api", user);

module.exports = app;