const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_SEND_PARAM = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoUrl",
  "about",
  "skills",
];

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
      message: err?.message,
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
      message: err?.message,
    });
  }
});

module.exports = userRouter;
