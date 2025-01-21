const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const constants = require("../utils/constants");

const userRouter = express.Router();

const USER_SEND_PARAM = constants.userReturnParam;

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req?.user;

    const data = await ConnectionRequest.find({
      toUserId: loggedInUser?._id,
      status: "interested",
    }).populate("fromUserId", USER_SEND_PARAM);

    res.json({
      message: "Data fetch successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const { _id } = req?.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: _id, status: "accepted" },
        { toUserId: _id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SEND_PARAM)
      .populate("toUserId", USER_SEND_PARAM);

    const data = connectionRequests.map((row) => {
      if (row?.fromUserId?._id?.toString() === _id?.toString()) {
        return row?.toUserId;
      }
      return row?.fromUserId;
    });

    res.json({
      message: "Data Fetch Successfully",
      data,
    });
  } catch (err) {
    res.status(404).json({
      error: err?.message,
    });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const page = req?.query?.page || 1;
    let limit = parseInt(req?.query?.limit) || 0;
    limit = limit < 50 ? limit : 50;
    const skip = (page - 1) * limit;

    const { _id } = req?.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: _id }, { toUserId: _id }],
    }).select(["fromUserId", "toUserId"]);

    const hideConnectedUser = new Set();

    connectionRequest.forEach((request) => {
      hideConnectedUser.add(request?.fromUserId?._id?.toString());
      hideConnectedUser.add(request?.toUserId?._id?.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideConnectedUser) } },
        { _id: { $ne: _id } },
      ],
    })
      .select(USER_SEND_PARAM)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Data fetch Successfully",
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      error: err?.message,
    });
  }
});

module.exports = userRouter;
