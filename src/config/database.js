const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:TGmSfquq9Qt89HoG@namstenode.9ido0mx.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NamsteNode"
  );
};
module.exports = { connectDB };
