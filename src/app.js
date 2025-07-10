const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid!");
    }
    const getUser = await User.findOne({ emailId });
    if (!getUser) {
      throw new Error("Invalid credientials!");
    }
    const isPasswordValid = await bcrypt.compare(password, getUser.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: getUser._id }, "DEV@tinder98777");
      res.cookie("token", token);
      res.status(200).send("User login Successfully!");
    } else {
      throw new Error("Username & Password is not correct!");
    }
  } catch (err) {
    res.status(400).send(`Something went wrong! ${err.message}`);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send(`Something went wrong,${err}`);
  }
});
app.post("/sendConnectionrequest",userAuth, async (req, res) => {
  const user=req.user;
  res.send(user.firstName+" connection request sent");
});
connectDB()
  .then(() => {
    console.log("database connection is established!");
    app.listen(3000, () => {
      console.log("server is running on port 3000...");
    });
  })
  .catch((err) => {
    console.log("database can't be connected!");
  });
