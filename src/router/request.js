const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req?.user;

    res.send("Request sent by " + user?.firstName);
  } catch (err) {
    res.status(400).send("ERROR " + err);
  }
});

module.exports = requestRouter;
