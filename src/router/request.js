const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const STATUSES = ["interested", "ignored"];

      const status = req?.params?.status;
      const toUserId = req?.params?.userId;
      const fromUserId = req?.user?._id;

      // check toUserId === fromUserId

      if (!STATUSES.includes(status)) {
        return res.status(400).json({
          message: "Status is not valid",
        });
      }

      // check request user in db
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "Requested User is not Found!",
        });
      }

      // check fromUser && toUser in db;

      const isAlreadyConnected = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      });

      if (isAlreadyConnected) {
        return res.status(400).json({
          message: "Users are already connceted",
        });
      }

      const connectionRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send({
        message: err?.message
      });
    }
  }
);

module.exports = requestRouter;
