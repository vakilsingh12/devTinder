const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/devTinder"    
  );
};
module.exports = { connectDB };
//mongodb+srv://namastedev:TGmSfquq9Qt89HoG@namstenode.9ido0mx.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NamsteNode