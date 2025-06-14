Use => npm run dev // to start the project 

API URL : localhost:3000/user/23/vakil?userid=445   

Params : 23 vakil
query : userid 

app.get("/user/:id/:name", (req, res) => {
  res.status(200).json({msg:"test routes Hello from node js server",query:req.query.userid,name_params:req.params.name});
});


---------------------Middleware concept --------------------------------
app.use(
  "/user",
  (req, res,next) => {
    res.send("user response 1");
    next()
  },
  (req, res) => {
    console.log("response 2");   
    res.send("user response 2");   // when request come here it will give an error Cannot set headers after they are sent to the client bcs already response send to client next here is middleware 
  }
);
if res.send below next middleare then====>

app.use(
  "/user",
  (req, res, next) => {
    next();
    res.send("user response 1");     //// when request come here it will give an error Cannot set headers after they are sent to the client bcs already response send to client next here is middleware 
  },
  (req, res) => {
    console.log("response 2");
    res.send("user response 2");
  }
);

O/p is  = > user response 2


app.use(
  "/user",
  (req, res, next) => {
    next();
    // res.send("user response 1");
  },
  (req, res,next) => {
    console.log("response 2");
    // res.send("user response 2");
    next();
  }
);
o/p : Cannot GET /user/ bcz next except another route after this 

app.use("/route",rh1,[rh2,rh3],rh4)   this is perfeclty fine

---------------------------------Error handling--------------------------------------
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