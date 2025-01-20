require("dotenv").config();
const express = require("express");
const User = require("../models/user");
const { validateSignIn, validateLogIn } = require("../utils/validations");
const getHash = require('../utils/hash');

const authRouter = express.Router();

authRouter.post("/signin", async (req, res) => {
  try {
    // validate the request fields
    validateSignIn(req);

    const { firstName, lastName, email, password } = req?.body;

    // decrypt the password using bcrypt
    const passwordHash = await getHash(password);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();

    res.send("User Created Successfully");
  } catch (err) {
    res.status(500).send("ERROR: " + err);
  }
});

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()) });
  res.send("Logout Successfully...!");
});

module.exports = authRouter;
