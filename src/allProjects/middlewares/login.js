const User = require("../models/userModel");

const isLoggedIn=(req,res,next)=>{
    if(req.session && req.session.user){
        req.user= req.session.user;
        return next()
    }
    res.redirect("/login")
}

module.exports={isLoggedIn};
