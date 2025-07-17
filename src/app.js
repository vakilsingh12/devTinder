const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const app = express();
app.use(express.json());
app.use(cookieParser());
// routes handling
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
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
