//const catchAsync=require("../../utils/errors/catchAsync");

const validateUserLoginJoiSchema=require("../utils/JoiSchema/validateUserLoginJoiSchema");
const validateUserRegisterJoiSchema=require("../utils/JoiSchema/validateUserRegisterJoiSchema");


const Project= require("../models/projectModel.js")
const User= require("../models/userModel.js")

const {isLoggedIn}= require("../middlewares/login.js")


const express= require("express")

const router= express.Router();





router.get("/projects/:name",async (req,res)=>{
    const project = await Project.findOne({name:req.params.name}).populate(
        {  
            path:"reviews",
            populate:{
                path:"author",
            }
        })
    console.log(project);  

        
    if(project){
        if(req.session.user) res.locals.currentUser=req.session.user;
        else res.locals.currentUser=null;
        res.status(200).render("project/singleProject.ejs",{project})
    }else{
        req.flash("error","No such campground exist");
        res.redirect("/oops");
    } 
})











//show all the projects
router.get("/allProjects",(async (req,res)=>{
    let isSearch=true;
    let skip=req.query.skip || 0;
    let limit=req.query.limit || 5;
    const projects= await Project.find({}).limit(limit).skip(skip);
    if(req.session.user){
        res.locals.currentUser=req.session.user;
        
    }else {
        res.locals.currentUser=null;
    }
    
    res.render("project/allProject",{projects,limit,skip,isSearch});
}))


//register form for new user..
router.get("/register",(req,res,next)=>{
    const payload={}
    res.locals.title="Register"
    res.locals.currentUser=null;
    res.render("project/users/register.ejs",{payload});
})


//post router for register page
router.post("/register",validateUserRegisterJoiSchema,async(req,res,next)=>{
    
    const idUser=await User.findOne({username:req.body.username.trim()});
    const emailUser=await User.findOne({email:req.body.email.trim()});

    if (idUser || emailUser){
        const payload={...req.body}
        let error="already taken";
        if(idUser && emailUser){
            error= `Userid and email ${error}`
        }
        else if(idUser){
            error= `Userid ${error}`
        }
        else{
            error= `Email ${error}`
        }


        // implement the otp system 




        payload.error=error
        res.locals.currentUser=null;
        res.locals.title="register"
        
        return res.render("project/users/register.ejs",{payload});
    }

    
    const user=User(req.body)
    user.save();
    req.flash("success",`    Welcome ${user.username}.    You can like and comment on all projects but if you don't verify your email then all actions will be reversed in 48 hrs` );
    req.session.user=user;
    res.redirect("/allProjects")
})




//login form 
router.get("/login",(req,res,next)=>{
    const payload={}
    res.locals.title="Login"
    res.locals.currentUser=null;
    res.render("project/users/login.ejs",{payload});
})
 


// post route for login
router.post("/login",validateUserLoginJoiSchema,async(req,res,next)=>{

    if(req.body.username.includes("@")){
        req.body.email=req.body.username
    }
    
    const {user,error}= await User.findByCred(req.body);
    if(!user){
        const payload={...req.body}
        payload.error=error
        res.locals.title="login"
        res.locals.currentUser=null;
        req.flash("error",`Incorrect username or password. Try again or reset your password.  WAIT! I never made forgot password route??`)   
        return res.render("project/users/login",{payload});
    }

    req.session.user=user;
    res.redirect("/allProjects");

})



//logout route..
router.get("/logout",(req,res,next)=>{
    if(req.session){
        req.session.destroy(()=>{
            res.redirect("/allProjects")
        })
    }
})

//implement verify account route...

router.get("/verify",(req,res)=>{
    res.render("comingSoon",{title:"Verify account"});
})



//implement forgot password and reset password route....




router.get("/forgot",(req,res)=>{
    res.render("comingSoon",{title:"Forgot password"});
})


module.exports=router;