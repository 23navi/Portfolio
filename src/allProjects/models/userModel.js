const mongoose= require("mongoose");
const bcrypt= require("bcrypt");

const userSchema = new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""

    },
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"Project"}],
    verified:Boolean,
},
{
    timestamps:true
})



userSchema.pre("save", async function(next){
    const user=this;
    if(user.isModified("password")){
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.statics.findByCred= async function(body){
    const user= await User.findOne({
        $or:[
        {
            username:body.username
        },
        {
            email:body.email
        }
    ]
    })

    if(!user) return {error:"No such user"}

    const isMatch= await bcrypt.compare(body.password,user.password);
    if(!isMatch) return {error:"Invalid Cred"}
    return {user};
}

const User = mongoose.model('User', userSchema);

module.exports = User;