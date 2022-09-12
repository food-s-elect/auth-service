const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: {
    type: String,
  },
  phone:{
    type:String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"],
  },
  country_code : {
    type:String,
    required:[true,"Country code is required"]
  },
  profile_completion: {
    type: Number,
    default: 0,
  },
  voted:{
    type:String
  },
  creation_ip: {
    type: String,
  },
  gender:{
    type:String
  },
  profile:{
    type:String,
    default:"https://i.pinimg.com/736x/f0/ce/2b/f0ce2bb845800dbf95f57fe928166d83.jpg"
  }
});

module.exports = mongoose.model("Users", user);