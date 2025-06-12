const express = require("express");
const app = express();

// app.use("/route",rh1,[rh2,rh3],rh4)   this is perfeclty fine
app.use("/user", [
  (req, res, next) => {
    next();
    // res.send("user response 1");
  },
  (req, res, next) => {
    console.log("response 2");
    res.send("user response 2");
    // next();
  },
]);

app.listen(3000, () => {
  console.log("server is running on port 3000...");
});
