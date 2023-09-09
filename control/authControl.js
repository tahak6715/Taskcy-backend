const { sendResponse } = require("../Helper/reqCheck");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2
const AuthControll = {

AllUser:async(req,res)=>{

  try {
    const result = await UserModel.find(); 
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

Profile:async(req,res)=>{
  const { _id } = req.body;
 
  try {
    const result = await UserModel.find({_id}); 
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


SignUp:async (req,res)=>{
const {userName,email,password} = req.body
const obj = { userName, email, password };
let requiredArr = ["userName", "email", "password"];
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

    let hashPassword = await bcrypt.hash(obj.password, 10);
    obj.password = hashPassword;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        res
          .send(sendResponse(false, null, "This Email is Already Exist"))
          .status(403);
    }else{
        UserModel.create(obj)
        .then((result) => {
          res.send(sendResponse(true,{user: result}, "User Saved Successfully"));
        })
        .catch((err) => {
          res
            .send(sendResponse(false, err, "Internal Server Error"))
            .status(400);
        });
    }     

  }



},
Login:async(req,res)=>{
    const { email, password } = req.body;
    const obj = { email, password };


    let result = await UserModel.findOne({ email });
    if (result) {
        let isConfirm = await bcrypt.compare(obj.password, result.password);
        if (isConfirm) {
          res.send(
            sendResponse(true, { user: result }, "Login Successfully")
          );
        } else {
            res.send(sendResponse(false, null, "Credential Error"));
          }
 } else {
            res.send(sendResponse(false, null, "User Doesn't Exist"));
          } 
},
protected: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
        if (err) {
          res.send(sendResponse(false, null, "Unauthorized")).status(403);
        } else {
            console.log(decoded);
          next();
        } 
      });
    } else {
      res.send(sendResponse(false, null, "Unauthorized")).status(403);
    }
  },

profileedit:async (req,res)=>{
  const {userName,email,password,id} = req.body
  const file = req.files.photo;
  try{
    let errArr = [];
   
    if (!userName) {
      errArr.push("Required : Date");
    }
      if (!email) {
        errArr.push("Required : Date");
      }
      // if (!Userid) {
      //   errArr.push("Required : Userid");
      // }
      if(!file){
        errArr.push("Require : Photo/Image")
      }
      if (errArr.length > 0) { 
        res
          .send(sendResponse(false, errArr, null, "Required All Fields"))
          .status(400);
        return;
      }

    }catch{

    }

}

,

UserEdit:async (req,res)=>{ 

  const {userName,email,UserNumber} = req.body;
  const file = req.files.photo;
  console.log(file)
try{
  let errArr = [];
 
  if (!userName) {
    errArr.push("Required : Date");
  }
    if (!email) {
      errArr.push("Required : email");
    }
    
    if (errArr.length > 0) { 
      res
        .send(sendResponse(false, errArr, null, "Required All Fields"))
        .status(400);
      return;
    }

    else{
      cloudinary.uploader.upload(file.tempFilePath,async (err,result)=>{ 
        console.log(result)
    let profileImg = result.url;
    const obj= {userName,email,UserNumber,profileImg}
    // let obj = {userName,Text,Date,Userid,Upload}
    let Main = await MainModel(obj)
    await Main.save();
        if (!Main) {
                  res
                    .send(sendResponse(false, null, "Internal Server Error"))
                    .status(400);
                } else {
                  res.send(sendResponse(true, Main, "Saved Successfully")).status(200);
                }
              })
    }

  }catch(err){
    res.send(sendResponse(false, null, "Internal Servre Error"));
  }




  

}


}

module.exports = AuthControll