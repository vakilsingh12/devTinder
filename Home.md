API URL : localhost:3000/user/23/vakil?userid=445   

Params : 23 vakil
query : userid 

app.get("/user/:id/:name", (req, res) => {
  res.status(200).json({msg:"test routes Hello from node js server",query:req.query.userid,name_params:req.params.name});
});
