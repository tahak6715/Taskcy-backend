



const express = require("express")
const { CreatTeam, PostTeam } = require("../control/TeamControl")
const route = express.Router()  



route.get("/Team",PostTeam)

route.post("/create",CreatTeam)


// route.post("/Sign",AuthControll.SignUp)

// route.post("/Login",AuthControll.Login)

// route.get("/check",AuthControll.protected,(req,res)=>{
//     res.send("user valid")
// })



route.delete("/:id",(req,res) =>{
    res.send("I M delete")

})

module.exports = route