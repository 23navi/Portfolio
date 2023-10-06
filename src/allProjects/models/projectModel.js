const mongoose= require("mongoose");

const projectSchema = new mongoose.Schema({
    
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}], //Will implement later

    name:{type:String},
    title:{type:String},
    images:[{url:String,filename:String}],
    descriptionBasic:{type:String},
    descriptionMain:{type:String},
    reviews: [{
        type:mongoose.Schema.Types.ObjectId,  // reviews will be an array of obj that refer to reviews
        ref:"Review"                   // We ref to the name of the model as we defined.
    }],
    projectStart:String,
    projectEnd:String,
    hasLiveLink:{type:Boolean, default:false},
    liveLink:String,
    hasGithub:{type:Boolean, default:false},
    githubLink:String,
    tags:[String],
    position:Number,

})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;