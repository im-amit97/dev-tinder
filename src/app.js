const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express(); //instance of express
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");
const cors = require("cors");
require('dotenv').config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter, requestRouter, userRouter);
app.use("/", profileRouter);

connectDB().then(() => {
  console.log("DB Connection estabilished succsessfully");
  app.listen(process.env.PORT, () => {
    console.log("Node server started on port " + process.env.PORT );
  });
});
