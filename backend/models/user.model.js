import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const User = new mongoose.model("User",UserSchema);

export default User;