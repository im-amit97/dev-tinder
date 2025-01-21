const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} status is not supported`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({
  fromUserId: 1,
  toUserId: 1,
});

connectionRequestSchema.pre("save", function (next) {
  const { fromUserId, toUserId } = this;
  if (fromUserId.equals(toUserId)) {
    throw new Error("Can't Send Connection to yourself");
  }

  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
