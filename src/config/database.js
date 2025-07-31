const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://adityasharma26059:m3XFaHCuicX2spN3@namastenode.70cxf01.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
