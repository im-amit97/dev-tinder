const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express(); //instance of express

app.use(express.json());

app.post("/signin", async (req, res) => {
  const user = new User(req?.body);

  try {
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    res.status(500).send("Failed to Sign In " + err);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmailId = req.body.emailId;
    const user = await User.findOne({ email: userEmailId });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("Users Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req?.body?.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("No User Found");
    } else {
      res.send("User Deleted Successfully");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error " + err);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req?.body?.userId, req?.body);
    if (!user) {
      res.status(404).send("No User Found");
    } else {
      res.send("User Updated Successfully");
    }
  } catch (err) {
    res.status(500).send("Something Went Wrong " + err);
  }
});

connectDB().then(() => {
  console.log("DB Connection estabilished succsessfully");
  app.listen(8000, () => {
    console.log("Node server started on port 8000");
  });
});
