import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    fullName:{type:String, required:true},
    password:{type:String,required:true,minlength:6},
    bio:{type:String, default:""},
    profilePic:{type:String,default:""},
    nativeLanguage:{type:String,default:""},
    learningLanguage:{type:String,default:""},
    isOnboarded:{type:Boolean,default:false},
    location:{type:String,default:""},
    SavedAvatars:{type:[String],default:[]},
    friends:[{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]
},{timestamps:true})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword= async function (enteredpass) {
    const isPasswordCorrect=await bcrypt.compare(enteredpass,this.password)
    return isPasswordCorrect;
}

const User= mongoose.model("User",userSchema);


export default User;