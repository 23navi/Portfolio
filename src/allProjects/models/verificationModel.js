const mongoose= require("mongoose");

const verifySchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, ref:"User",
    otp:Number,
    verified:{
        type:Boolean,
        default:false,
    }
},
{
    timestamps:true
})


const Verify = mongoose.model('Verify', verifySchema);

module.exports = Verify;