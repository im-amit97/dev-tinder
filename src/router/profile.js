require("dotenv").config();
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateEditPasswordRequest,
} = require("../utils/validations");
const User = require("../models/user");
const getHash = require("../utils/hash");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req?.user;
    res.json({
      message: "Data fetch Successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);

    const loggedInUser = req?.user;

    Object.keys(req?.body).forEach(
      (key) => (loggedInUser[key] = req?.body[key])
    );

    const user = await loggedInUser.save();

    res.json({
      message: "User Edited Successfully...!",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message
    });
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validateEditPasswordRequest(req);

    const { _id } = req?.user;
    //TODO: handle Current Password
    const { currentPassword, password } = req?.body;

    const passwordHash = await getHash(password);

    await User.findByIdAndUpdate(_id, { password: passwordHash });
    res.send("User Password updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

module.exports = profileRouter;
