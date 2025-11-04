import express, { Router } from "express";
import { protectRoute } from "../Middlewares/auth.js";
import { getRecommendedUsers,getMyFriends, acceptFriendRequest, getfriendRequests, getOutgoingRequests, sendFriendRequest } from "../Controllers/usercontroller.js";
import { toggleSavedAvatar } from "../Controllers/authcontroller.js";

const UserRouter= express.Router();
UserRouter.use(protectRoute);

UserRouter.get("/", getRecommendedUsers)
UserRouter.get("/friends",getMyFriends)

UserRouter.post("/friend-request/:id",sendFriendRequest)
UserRouter.put("/friend-request/:id/accept",acceptFriendRequest)
UserRouter.get("/friend-requests",getfriendRequests)

UserRouter.get("/outgoing-friend-requests",getOutgoingRequests)




export default UserRouter;


