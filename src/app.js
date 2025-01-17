const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express(); //instance of express

app.post("/signin", async (req, res) => {
  const payload = {
    firstName: "John",
    lastName: "Sena",
    email: "john.s@gmail.com",
    password: "987678",
    age: 30,
    gender: "M",
  };

  const user = new User(payload);

  try {
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    res.send("Failed to Sign In " + err);
  }
  await user.save();
  res.send("User Created Successfully");
});

connectDB().then(() => {
  console.log("DB Connection estabilished succsessfully");
  app.listen(8000, () => {
    console.log("Node server started on port 8000");
  });
});
