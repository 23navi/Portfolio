if(process.env.NODE_ENV!== "production"){
    require('dotenv').config({ path: './config/dev.env' })
}



const express= require("express")

const router= express.Router();


const {sendEmail,verifyEmail} = require("../email/acc");

// verifyEmail("navisureka23@gmail.com","Yooo Babe");




//contact route
router.post("/contact",(req,res,next)=>{

    if(!req.body.name || !req.body.email || !req.body.message){
        const post={error:"Sorry fill required filds"}
        return res.send(post);
    }
    sendEmail(req.body.email,req.body.name)
    const post={}
    res.send(post);
})


router.get("/testMail",(req,res)=>{
    verifyEmail("navisureka23@gmail.com","navi");
    res.send("hell000");
})



module.exports=router;

