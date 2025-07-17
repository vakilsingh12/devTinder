const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    //creating a new instance of the user model
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInstance = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await userInstance.save();
    res.send("User created successfully!");
  } catch (err) {
    console.log(err.message);
    res.status(400).send(`Error while saving the database! ${err.message}`);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid!");
    }
    const getUser = await User.findOne({ emailId });
    if (!getUser) {
      throw new Error("Invalid credientials!");
    }
    const isPasswordValid = await getUser.validatePassword(password);
    if (isPasswordValid) {
      const token = await getUser.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.status(200).send("User login Successfully!");
    } else {
      throw new Error("Username & Password is not correct!");
    }
  } catch (err) {
    res.status(400).send(`Something went wrong! ${err.message}`);
  }
});
module.exports = authRouter;
