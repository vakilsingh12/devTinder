const express = require("express");
const app = express();
app.get("/user/:id/:name", (req, res) => {
    console.log(req.query.userid,req.params);
  res.status(200).json({msg:"test routes Hello from node js server",query:req.query.userid,name_params:req.params.name});
});

app.listen(3000, () => {
  console.log("server is running on port 3000...");
});
