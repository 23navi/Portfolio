// Middleware to check if the user is authorized to make changes to the given review

const Review=require("../models/reviewModel");

// const catchAsync=require("../utils/errors/catchAsync")

module.exports.isReviewAuthorized = (async(req,res,next)=>{

    const {name,revId}= req.params;   // if the user is not auth... we will redirect him/ her using the campground id(id)
    const review= await Review.findById(revId);

    if(!review){
        req.flash("error","No review with this id");
        return res.redirect(`/where to ?/${id}`);
    }
 
    if(!review.author.equals(req.user._id)){     // req.user._id -> is the current logged in user
        req.flash("error","You are not authorized")
        console.log("or this is?")
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
})