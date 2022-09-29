const Joi=require("joi");
//const ExpressError = require("../errors/ExpressError");

const validateUserRegisterJoiSchema=(req,res,next)=>{
    
    const UserJoiSchema=Joi.object({
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            username:Joi.string().required(),
            email:Joi.string().required(),
            password: Joi.string().required(),
            
    })
    const result= UserJoiSchema.validate(req.body);

    if(result.error){
        const payload={...req.body}
        res.locals.currentUser=null;
        
        res.render("project/users/register",{payload});
    }else{
        next();
    }
}

module.exports=validateUserRegisterJoiSchema;