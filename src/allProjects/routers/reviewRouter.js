const Review =require("../models/reviewModel");
const Project =require("../models/projectModel");
// const validateReviewJoiSchema=require("../../utils/JoiSchema/validateReviewJoiSchema");

const validateUserRegisterJoiSchema=require("../utils/JoiSchema/validateReviewJoiSchema");



const express= require("express")
const router= express.Router();

const {isLoggedIn}=require("../middlewares/login")
const {isReviewAuthorized}=require("../middlewares/isReviewAuthorized");







//Delete a project's review by it's id
router.delete("/projects/:name/reviews/:revId",isLoggedIn,isReviewAuthorized,(async(req,res,next)=>{
    const project= await Project.findOne({name:req.params.name});
    const review= await Review.findById(req.params.revId);

    //Campground.findByIdAndUpdate(id,{$pull:{reviews:revId}});  // remove the value provided from the array
    //Review.findByIdAndDelete(reviewId)

    console.log("remove request: ",req.params.revId)
    console.log("remove request review selected: ",review)
    console.log("before removing: ",project.reviews)

    project.reviews=project.reviews.filter((arrReview)=>{
        return arrReview.toString()!==review._id.toString()
    })

    console.log("After removing: ",project.reviews);
    
    await project.save()
    //r1= await Review.deleteOne({"id":review.id})
    const r2= await Review.findOneAndDelete({"_id":review._id}) //note deleteOne do not trigger a middleware so we need to use findOneAndDelete
    
    console.log("Deleted review: ",r2._id);

    req.flash("success","Successfully deleted the review");
    res.redirect("/projects/"+project.name);
}))



// submit form for reviews on a particular campground

router.post("/projects/:name/reviews",isLoggedIn, validateUserRegisterJoiSchema,async(req,res,next)=>{
    const project= await Project.findOne({name:req.params.name});
    const review=await new Review(req.body.review)
    review.author=req.user._id;
    project.reviews.push(review)
    await project.save();
    await review.save();
    console.log("List of reviews when new rev is created: ")
    req.flash("success","Successfully created a new review");
    res.redirect("/projects/"+req.params.name);
})






module.exports=router;