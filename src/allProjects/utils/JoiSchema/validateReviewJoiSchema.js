const Joi=require("joi");




//it will act as a middlewareee

const validateReviewJoiSchema=(req,res,next)=>{
    const reviewJoiSchema=Joi.object({
        review:Joi.object({
            body:Joi.string().required()
        }).required()
})

    const result= reviewJoiSchema.validate(req.body);


    
    if(result.error){
        const message=result.error.details.map(el=>el.message);
        console.log("error in review validator");
    }else{
        next();
    }
}

module.exports=validateReviewJoiSchema;