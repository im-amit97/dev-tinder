const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express(); //instance of express
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter, profileRouter);

connectDB().then(() => {
  console.log("DB Connection estabilished succsessfully");
  app.listen(8000, () => {
    console.log("Node server started on port 8000");
  });
});
