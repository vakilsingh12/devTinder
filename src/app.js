const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  const userInstance = new User(req.body);
  try {
    await userInstance.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("Error while saving the database!");
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
