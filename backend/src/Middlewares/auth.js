import jwt from "jsonwebtoken";
import User from "../Models/User.js";


export const protectRoute= async(req,res,next)=>{
  try {
    const token=req.cookies.jwt
    if(!token){
        console.log("unauthorized user");
        return res.status(401).json({success:false,message:"no token"})
    }

    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decoded){
        return res.status(401).json({success:false,message:"Unauthorized user, token invalid"})
    }
    
        const user = await User.findById(decoded.userId).select("-password");
        // ANOTHER WAY OF ABOVE LINE const user = await User.findOne({_id:decoded.userId}).select("-password");

    if(!user){
        return res.status(401).json({success:false,message:"Unauthorized user not found"})
    }

    req.user=user;
    next();
  } catch (error) {
    console.log("error in protection route");
    console.error(error.message);
  }
}