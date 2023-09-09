const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  profileImg:{
    type:String,
    require:false
  },
 UserNumber:{
    type:String,
    require:false
  },

});

const UserModel = mongoose.model("users", userSchema);

module.exports  = UserModel ;