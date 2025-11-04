import User from "../Models/User.js"
import jwt from 'jsonwebtoken';
import { upsertStreamUser } from "../Lib/stream.js";

export const signup =async (req, res) => {
    const {email,password,fullName}=req.body
    try {
        if(!email || !password || !fullName ){
            return res.status(400).json({message:"all fields are required"})
        }

        if(password.length<6){
            return res.status(400).json({message:"min characters are 6"})
        }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
           return res.status(400).json({ message: "Invalid email format" });
}
    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({success:false,message:"email already exists"})
    }
    const index= Math.floor(Math.random()*100)+1;
    const randomavatar=`https://avatar.iran.liara.run/public/${index}.png`

    const newUser=await User.create({
        email,
        fullName,
        password,
        profilePic:randomavatar,
    })
    try {
         await upsertStreamUser({
        id:newUser._id.toString(),
        name:newUser.fullName,
        image:newUser.profilePic || "",
    });
    console.log(`stream user created for ${newUser.fullName}`)
    } catch (error) {
    console.log("error creating stream user",error);
    }


    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"6d"
    })

    res.cookie("jwt",token,{
       maxAge:7*24*60*60*1000,
       httpOnly:true,
       sameSite:"strict",
       secure:process.env.NODE_ENV=="production"
    })
    
    res.json({success:true,user:newUser})


    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:"internal server error"})
    }
}

export const login = async (req, res) => {
    try {
   const {email,password}=req.body;

   if(!email || !password){
    return res.status(400).json({success:false,message:"email password required"});
   }
   
   const user=await User.findOne({email});
   if(!user){
     return res.status(401).json({success:false,message:"user not found"});
   }
   const isPasswordCorrect= await user.matchPassword(password);

   if(!isPasswordCorrect) {
   return res.status(401).json({success:false,message:"invalid password"});
   }

 const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"6d"
    })

    res.cookie("jwt",token,{
       maxAge:7*24*60*60*1000,
       httpOnly:true,
       sameSite:"strict",
       secure:process.env.NODE_ENV=="production"
    })

res.json({success:true,user})


} catch (error) {
    console.log("error in login controller",error.message);
    return res.json({success:false,message:"internal error"})
}
}

export const logout = (req, res) => {
    res.clearCookie("jwt");
    return res.json({success:true,message:"logged out"});

}

// export const onboard= async (req,res)=>{
//     console.log(req.user); 
//     try {
//         const userId= req.user._id;
//         const {fullName,bio,nativeLanguage,learningLanguage,location}=req.body;
//         if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
//             return res.json({
//                 success:false,
//                 message:"fill all fields",
//                 missingFields:[
//                     !fullName && "fullName",
//                     !bio && "bio",
//                     !nativeLanguage && "nativeLanguage",
//                     !learningLanguage && 'learningLanguage',
//                     !location && "location"
//                 ].filter(Boolean)
//         });
//         }
//     const updatedUser= await User.findByIdAndUpdate(userId,{
//         ...req.body,
//          isOnboarded:true,
//     },{new:true})

//     if(!updatedUser) return res.status(404).json({success:false,message:"user not found"})
       
//     try {
//          await upsertStreamUser({
//         id:updatedUser._id.toString(),
//         name:updatedUser.fullName,
//         image:updatedUser.profilePic || "",
//     })
//         console.log(`user updated after onboarding on steam ,user is ${updatedUser.fullName}`);
       
//     } catch (error) {
//         console.log("error updating stream user during onboarding",error);
        
//     }
    

//         res.json({success:true,user:updatedUser});
//     } catch (error) {
//         console.error("onboarding error",error);
//        return res.status(500).json({success:false,message:"internal error"});
        
//     }
// }


export const onboard = async (req, res) => {
    console.log("--- ONBOARDING PROCESS STARTED ---");
    console.log("1. Received req.user object:", req.user);

    try {
        const userId = req.user._id;
        console.log("2. Extracted userId:", userId);

        const { fullName, bio, nativeLanguage, learningLanguage, location,Saved } = req.body;

        // Validation Block (assuming it passes)
        if (!fullName || !nativeLanguage || !learningLanguage || !location || !bio) {
            console.log("X. FAILED at validation block.");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        console.log("3. Validation passed.");

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { ...req.body, isOnboarded: true },
            { new: true }
        );

        // This is the most important log
        console.log("4. Result from findByIdAndUpdate:", updatedUser);

        if (!updatedUser) {
            console.log("X. FAILED because user was not found in database. Exiting.");
            return res.status(404).json({ success: false, message: "User not found with the provided ID" });
        }

        console.log("5. MongoDB update was successful.");

        // Inner try...catch for Stream
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });
            console.log("6. Stream user update was successful.");
        } catch (streamError) {
            console.log("X. FAILED at Stream user update.", streamError);
            // Still return an error
            return res.status(500).json({ success: false, message: "Failed to update chat service." });
        }

        console.log("7. Sending final success response.");
        return res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("X. FAILED in the main catch block.", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// export const toggleSavedAvatar=async(req,res)=>{
//     try {
//         const userId= req.user._id
//         const {Avatardata}= req.body

//         if(!Avatardata){return res.json({success:false,message:"post relevent data"})}
//         const user= await User.findById(userId);
//         if(!user){
//             return res.status(400).json({success:false,message:"User not found"});
//         }

//          user.SavedAvatars = user.SavedAvatars.filter(a => a);

//         const alreadySaved= user.SavedAvatars.includes(Avatardata);
//         if (!alreadySaved){
//             user.SavedAvatars.push(Avatardata)
//         }
//         else {user.SavedAvatars.filter(avatar=> avatar !== Avatardata)
//         }
//         await user.save()

//         res.status(200).json({
//             message:alreadySaved?(
//               "deleted avatar")
//             :("created avatar")
//         })

//     } catch (error) {
//         return res.status(400).json({success:false,message:"error in toggleavatar"})
//     }
// }

export const toggleSavedAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatarData } = req.body;

    if (!avatarData || typeof avatarData !== "string") {
      return res.status(400).json({ message: "avatarData must be a string" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure array is clean
    user.SavedAvatars = user.SavedAvatars.filter(a => a); // remove null/undefined

    // Trim both sides to prevent mismatch due to spaces
    const normalizedAvatar = avatarData.trim();

    const alreadySaved = user.SavedAvatars.some(a => a.trim() === normalizedAvatar);

    if (alreadySaved) {
      // remove it
      user.SavedAvatars = user.SavedAvatars.filter(a => a.trim() !== normalizedAvatar);
      await user.save();
      return res.status(200).json({ message: "deleted avatar", savedAvatars: user.SavedAvatars });
    } else {
      // add it
      user.SavedAvatars.push(normalizedAvatar);
      await user.save();
      return res.status(200).json({ message: "created avatar", savedAvatars: user.SavedAvatars });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
