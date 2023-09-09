const { sendResponse } = require("../Helper/reqCheck");
const TaskModel = require("../models/TaskModel");



const TaskControl = {


GetTask: async(req,res)=>{

    const {teamid} = req.body


    try {
        const result = await TaskModel.find({teamid:teamid}); 
        if (!result) {
          res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else {
          res.send(sendResponse(true, result)).status(200);
        }
      } catch (e) {
        console.log(e);
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
      }
    


},


CreateTask: async (req,res)=>{
    const {TaskName,TeamMember,Date,StartTime,EndTime,select,teamid} = req.body
const obj =  {TaskName,TeamMember,Date,StartTime,EndTime,select,teamid}
let requiredArr = ["TaskName", "TeamMember", "Date","StartTime","EndTime","select","teamid" ];
let errArr = [];
requiredArr.forEach((x) => {
    if (!obj[x]) {
      errArr.push(x);
    }
  });
  if (errArr.length > 0) {

    res
      .send(sendResponse(false, null, "Some Fileds are Missing", errArr))
      .status(400);
    return;
  }else{
        TaskModel.create(obj)
        .then((result) => {
          res.send(sendResponse(true, result, "User Saved Successfully"));
        })
        .catch((err) => {
          res
            .send(sendResponse(false, err, "Internal Server Error"))
            .status(400);
        });
    }     
}

}




module.exports = TaskControl 