const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();
requestsRouter.post("/sendConnectionrequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " connection request sent");
});
module.exports = requestsRouter;
