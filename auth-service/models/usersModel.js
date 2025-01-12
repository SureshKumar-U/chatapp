

 const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
       type : String
    },
    email :{
        type : String,
        unique : true,
        required : true,
    },
    password :{
        type :String,
        required: true
    },
    isAdmin :{
        type: Boolean,
        default : false
    }


},{timestamps: true})

const userModel =mongoose.models.users || mongoose.model("User", userSchema)
module.exports =   userModel;