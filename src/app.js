const express = require("express");
const connectDB = require("./config/database");
const { validateSignIn, validateLogIn } = require("./utils/validations");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express(); //instance of express

app.use(express.json());
app.use(cookieParser());

app.post("/signin", async (req, res) => {
  try {
    // validate the request fields
    validateSignIn(req);

    const { firstName, lastName, email, password } = req?.body;

    // decrypt the password using bcrypt
    const passwordHash = await bcrypt.hash(password, process.env.SALT_ROUNDS);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();

    res.send("User Created Successfully");
  } catch (err) {
    console.log("ERROR : " + err);
    res.status(500).send("ERROR: " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLogIn(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    //compare password
    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
      // create JWT Token
      const token = user.getJWT();

      // set the token to cookies
      res.cookie("token", token);
      res.send("Login Successful..!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req?.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req?.user;

    res.send("Request sent by " + user?.firstName);
  } catch (err) {
    res.status(400).send("ERROR " + err);
  }
});

connectDB().then(() => {
  console.log("DB Connection estabilished succsessfully");
  app.listen(8000, () => {
    console.log("Node server started on port 8000");
  });
});
