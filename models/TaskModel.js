const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  TaskName: {
    type: String,
    required: false,
  },
  TeamMember: {
    type:Object,
    required: false,
  },
  Date:{
    type:String,
    require:false
  },
  StartTime:{
    type:String,
    require:false
  },
  EndTime:{
    type:String,
    require:false
  },
  select:{
    type:String,
    require:false
  },
  teamid:{
    type:String,
    require:false
  },
  

});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports  = TaskModel ;