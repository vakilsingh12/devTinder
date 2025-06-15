const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
app.post("/signup", async (req, res) => {
  const userObject = {
    firstName: "Vakil",
    lastName: "Singh",
    emailId: "vakil@gmail.com",
    password: "vakil@123",
  };
  const userInstance = new User(userObject);
  await userInstance.save();
  res.send("User created successfully!");
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
