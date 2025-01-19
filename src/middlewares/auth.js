const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not available");
    }

    const { _id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("Unauthorised Access");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status("404").send("ERROR " + err);
  }
};

module.exports = {
  userAuth,
};
