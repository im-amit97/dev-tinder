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

app.get("/user", async(req, res) => {
    try {
        const userEmailId = req.body.emailId;
        const user = await User.findOne({email: userEmailId });
        if (!user) {
            res.status(404).send('User Not Found');
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(500).send('Internal Server Error');
    }

});

app.get("/feed", async(req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).send('Users Not Found');
        } else {
            res.send(users);
        }
    } catch(err) {
        res.status(500).send('Internal Server Error');
    }

});

connectDB().then(() => {
  console.log("DB Connection estabilished succsessfully");
  app.listen(8000, () => {
    console.log("Node server started on port 8000");
  });
});
