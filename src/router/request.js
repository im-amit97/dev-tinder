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

      if (!STATUSES.includes(status)) {
        return res.status(400).json({
          error: "Status is not valid",
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          error: "Requested User is not Found!",
        });
      }

      const isAlreadyConnected = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isAlreadyConnected) {
        return res.status(400).json({
          error: "Users are already connceted",
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
        error: err?.message,
      });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req?.user;
      const { status, requestId } = req?.params;

      const ALLOWED_STATUS = ["accepted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
          error: "Status not valid",
        });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        fromUserId: requestId,
        toUserId: loggedInUser?._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({
          error: "No Connection Request Found",
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save(loggedInUser);

      res.json({
        message: `${loggedInUser?.firstName} ${status} the request`,
        data,
      });
    } catch (err) {
      res.status(400).json({ error: err?.message });
    }
  }
);

module.exports = requestRouter;
