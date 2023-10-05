// Only i can access it
const User = require("../models/userModel");

const isNavi=async(req,res,next)=>{
    if(req.session && req.session.user){
        const navi= await User.findById(req.session.user._id);
        if(navi && (navi.username=="Navi" || navi.username=="navi")){
            req.user= req.session.user;
            return next()
        }
    }
    res.redirect("/oops")
}

module.exports={isNavi};
