const express = require("express");
const app = express();
app.get("/user", (req, res) => {
  console.log("user api");
  // try {
    throw new Error("router error");
    res.send("get user data ");
  // } catch (err) {
  //   res.status(500).send("Something wrong");
  // }
});
app.use("/", (err, req, res, next) => {
  console.log("Hii there");
  if (err) {
    res.status(500).send("Something went wrong");
  }
});
app.listen(3000, () => {
  console.log("server is running on port 3000...");
});
