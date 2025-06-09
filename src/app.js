const express = require("express");
const app = express();
app.use("/test",(req,res)=>{
    res.send("Hello from node js server")
})
app.listen(3000, () => {
  console.log("server is running on port 3000...");
});
