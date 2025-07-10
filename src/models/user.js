const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
let userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough!");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gendar: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://skiblue.co.uk/wp-content/uploads/2015/06/dummy-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid!");
        }
      },
    },
    about: {
      type: String,
      default: "This is default user!",
      maxLength: 1500,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@tinder98777", {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const hashedPassword = this.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser, 
    hashedPassword
  );
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
