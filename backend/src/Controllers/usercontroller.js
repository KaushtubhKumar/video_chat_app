import User from "../Models/User.js";
import FriendRequest from "./friendrequest.js";


export async function getRecommendedUsers(req,res) {
    try {
        const currentUserId= req.user._id;
        const currentUser= await req.user;

    const recommendedUsers=await User.find({
        $and:[
            {_id:{$ne:currentUserId}},
            {_id:{$nin:currentUser.friends}},
            {isOnboarded:true}
        ]
    })
    return res.json({success:true,recommendedUsers});

    } catch (error) {
        console.error("error in getrecommended controller",error.message);
        res.status(500).json({success:false,message:"internal error"})
    }
    
}

export async function getMyFriends(req,res) {
    try {
        const user=await User.findById(req.user.id).select("friends")
        .populate("friends"," fullName profilePic nativeLanguage learningLanguage location");

    res.status(200).json(user.friends)
    } catch (error) {
    console.error("error in getmyfriends",error.message);
    res.status(500).json({message:"internal error"})
    }
}

export async function sendFriendRequest(req,res){
    try {
    const myId= req.user.id;
    const {id:recipientId}=req.params;

    //khud ko na bhej dena request
    if(myId=== recipientId){
        res.status(400).json({message:"you cannot send friend req to urself"})
    }
    const recipient= await User.findById(recipientId)
    if(!recipient){
        return res.status(400).json({success:false,message:"recipient not found"})

    }
    //check if user is friends
    if(recipient.friends.includes(myId)){
        return res.status(400).json({message:"you are already friends"})
    }
    const existingRequest= await FriendRequest.findOne({
        $or:[
            {sender:myId, recipient:recipientId},
            {sender:recipientId, recipient:myId},
        ]
    })

    if (existingRequest){
        return res.status(400).json({message:"you have already sent request"})
    }
    const friendRequest= await FriendRequest.create({
        sender:myId,
        recipient:recipientId,
    })
    res.status(201).json(friendRequest);
     
    } catch (error) {
        console.error("error in sending request",error);
    }

}

export async function acceptFriendRequest(req,res){
   try {
    const {id:requestid}=req.params;
    const friendRequest= await FriendRequest.findById(requestid)
    
    if(!friendRequest){
        return res.status(400).json({message:"friend request not found"})
    }
    if(friendRequest.recipient.toString() !==req.user.id)
        return res.status(403).json({message:"friend request not found"})

    friendRequest.status="accepted";
    await friendRequest.save()

    //add each other to friends

    await User.findByIdAndUpdate(friendRequest.sender,{
        $addToSet:{friends:friendRequest.recipient},
    })

     await User.findByIdAndUpdate(friendRequest.recipient,{
        $addToSet:{friends:friendRequest.sender},
    })
    return res.status(200).json({message:"friend request accepted"})


   } catch (error) {
     console.log("error in acceptrequest",error.message);
    return res.status(500).json({message:"internal error"})

   }
}

export async function getfriendRequests(req,res){
  try {
    const user= req.user;

    const incomingReqs= await FriendRequest.find({
        recipient:req.user.id,
        status:"pending"
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage location")


    const acceptedReqs= await FriendRequest.find({
        sender:req.user.id,
        status:"accepted",
    }).populate("recipient","fullName profilePic");

    return res.status(200).json({incomingReqs,acceptedReqs})

  } catch (error) {
     console.log("error in getfriendrequest",error.message);
    return res.status(500).json({message:"internal error"})

  }
}


export async function getOutgoingRequests(req,res){
  try {
    const outgoingreqs= await FriendRequest.find({
          sender:req.user.id,
          status:"pending",
    }).populate("recipient","fullName profilePic nativeLanguage learningLanguage")

    return res.status(200).json({outgoingreqs})

  } catch (error) {
     console.log("error in outgoingrequest",error.message);
    return res.status(500).json({message:"internal error"})
  }
}