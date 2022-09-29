const Joi=require("joi");

const validateUserLoginJoiSchema=(req,res,next)=>{
    const UserJoiSchema=Joi.object({
            username:Joi.string(),
            email:Joi.string(),
            password: Joi.string().required(),
            
})

    const result= UserJoiSchema.validate(req.body);


    if(result.error){
        const payload={}
        res.locals.currentUser=null;
        return res.render("users/login",{payload})

    }else{
        next();
    }
}






module.exports=validateUserLoginJoiSchema;