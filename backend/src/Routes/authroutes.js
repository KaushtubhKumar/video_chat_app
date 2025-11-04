import express from "express";
import { login, logout, onboard, signup, toggleSavedAvatar } from "../Controllers/authcontroller.js";
import { protectRoute } from "../Middlewares/auth.js";

const Authrouter=  express.Router();
Authrouter.post("/signup",signup)
Authrouter.post("/login",login)
Authrouter.post("/logout",logout)
Authrouter.post("/onboarding",protectRoute,onboard);
Authrouter.post("/toggle-avatar",protectRoute,toggleSavedAvatar)

Authrouter.get("/me",protectRoute,(req,res)=>{
    res.json({success:false,user:req.user})
});

export default Authrouter;