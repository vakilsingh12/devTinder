const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const app = express();
app.use(express.json());
app.get("/user", async (req, res) => {
  // const userEmail = req.body.emailId;
  try {
    const user = await User.findOne();
    if (!user) {
      res.status(404).send("user not found!");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
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
    if(isPasswordValid){
      res.status(200).send("User login Successfully!")
    }else{
      throw new Error("Username & Password is not correct!");
    }
  } catch (err) {
    res.status(400).send(`Something went wrong! ${err.message}`);
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const UPDATE_FIELDS = [
      "firstName",
      "lastName",
      "gendar",
      "about",
      "skills",
      "photoUrl",
    ];
    const isUpdatedAllowed = Object.keys(data).every((k) =>
      UPDATE_FIELDS.includes(k)
    );
    if (!isUpdatedAllowed) {
      throw new Error("Updates are not allowed!");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Skills can't be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).send("user updated Sucessfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!", err.message);
  }
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
