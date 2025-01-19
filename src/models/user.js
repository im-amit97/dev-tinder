const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["M", "F", "O"].includes(value)) {
          throw new Error("Gender is not available");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  try {
    const token = jwt.sign({ _id: this?._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return token;
  } catch (err) {
    throw new Error("ERROR " + err);
  }
};

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const hashPassword = this?.password;
    const isPasswordValid = await bcrypt.compare(userPassword, hashPassword);
    return isPasswordValid;
  } catch (err) {
    throw new Error("ERROR " + err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
