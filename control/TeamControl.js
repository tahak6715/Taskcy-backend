const { sendResponse } = require("../Helper/reqCheck");
const TeamModel = require("../models/teamModel");
const UserModel = require("../models/userModel");


const TeamAuth = {

  PostTeam: async (req,res)=>{ 

    try {
      const result = await TeamModel.find();


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
CreatTeam:async (req,res)=>{
  const {TeamName,TeamMember,select} = req.body
  const obj = { TeamName, TeamMember, select };
  let requiredArr = ["TeamName", "TeamMember", "select"];
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
          TeamModel.create(obj)
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


module.exports = TeamAuth