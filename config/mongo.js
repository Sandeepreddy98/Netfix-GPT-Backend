const mongoose = require("mongoose");

const mongoDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gsandeepreddy98:qYUOt91qlTprfvfo@namastedev.eo9vs.mongodb.net/netflix-GPT"
  );
};

module.exports = mongoDB;
