import express, { Router } from "express";
import { protectRoute } from "../Middlewares/auth.js";
import { getStreamToken } from "../Controllers/chatcontroller.js";

const ChatRouter= express.Router() 

ChatRouter.get("/token",protectRoute,getStreamToken)



export default ChatRouter