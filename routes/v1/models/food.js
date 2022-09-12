const mongoose = require("mongoose");
const user = require("./user");

const food = new mongoose.Schema({
  name: {
    type: String,
  },
  decription: {
    type: String,
  },
  votes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: user }],
  },
  image: {
    type: String,
    default: "http://192.168.1.159:8082/assets/food-icon.png",
  },
  creation_ip: {
    type: String,
  },
});

module.exports = mongoose.model("Foods", food);
