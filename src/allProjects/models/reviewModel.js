const mongoose=require("mongoose");


const reviewSchema=new mongoose.Schema({
    body:String, //Text of the review 
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
})


// note : to display the review submit form.. we will display it at show.ejs only which is at campground/:id but to submit the form we will create a new post request 


const Review= new mongoose.model("Review",reviewSchema);



module.exports = Review;

