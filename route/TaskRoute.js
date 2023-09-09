



const express = require("express")
const { CreateTask, GetTask } = require("../control/TaskControl")

const route = express.Router() 

route.post("/GetTask",GetTask)

route.post("/create",CreateTask)


// route.post("/Sign",AuthControll.SignUp)

// route.post("/Login",AuthControll.Login)

// route.get("/check",AuthControll.protected,(req,res)=>{
//     res.send("user valid")
// })



route.delete("/:id",(req,res) =>{
    res.send("I M delete")

})

module.exports = route