const { number } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true],
  },
  password: {
    type: String,
    required: [true],
  },
  contacts: {
     type: String,
     default: "" },
  bio:{
    type: String, default: ""
  },
  birthyear:{
    type: Number
  },
  favorites:{
    type: String, default: ""
  },
  profile:{
     type:String
  }
 

});

module.exports = mongoose.model("users", userSchema);
