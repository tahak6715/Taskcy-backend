const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  TeamName: {
    type: String,
    required: false,
  },
  TeamMember: {
    type:Object,
    required: false,
  },
  select:{
    type:String,
    require:false
  }
});

const TeamModel = mongoose.model("Team", TeamSchema);

module.exports  = TeamModel ;