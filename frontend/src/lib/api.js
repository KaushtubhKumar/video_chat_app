import axios from "axios"
import { axiosInstance } from "./axios"
import { data } from "react-router"

export const signup= async(signupData)=>{
    const response= await axiosInstance.post("/auth/signup",signupData)
 return response.data
  }

export const login= async(loginData)=>{
    const response= await axiosInstance.post("/auth/login",loginData)
 return response.data
  }

export const logout= async()=>{
    const response= await axiosInstance.post("/auth/logout")
 return response.data
  }

export const getAuthUser= async()=>{
  try {
    const res=await axiosInstance.get("/auth/me")
    return res.data

  } catch (error) {
    console.log("error in getauthuser",error);
    return null
  }
    
  }

export async function completeOnboarding(userData) {
  console.log(userData);
    const response= await axiosInstance.post("/auth/onboarding",userData)
    return response.data
}

export async function changeAvatar(incomingUrl) {
    const response= await axiosInstance.post("/auth/toggle-avatar",avatarData)
     return response.data
}

export const getUserFriends= async()=>{
    const response= await axiosInstance.get("/users/friends")
 return response.data
  }

// export const getRecommendedUsers= async()=>{
//     const response= await axiosInstance.get("/users");
//      console.log("🔍 /users API raw response:", response.data);
//       if (data?.recommendedUsers) return data.recommendedUsers;
//   if (Array.isArray(data)) return data;
//   if (data?.users) return data.users;
//   if (data?.data) return data.data;
//   return [];
//  return response.data
//   }

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  const data = response.data;

  console.log("🔍 /users API raw response:", data);

  // ✅ Always return just the array
  if (Array.isArray(data)) return data;
  if (data?.recommendedUsers) return data.recommendedUsers;
  if (data?.users) return data.users;
  if (data?.data) return data.data;
  return [];
};

export const getOutgoingFriendReqs= async()=>{
    const response= await axiosInstance.get("/users/outgoing-friend-requests")
  console.log(response.data);
 return response.data?.outgoingreqs || []
  }

  
  export const sendFriendRequest= async(userId)=>{
    const response= await axiosInstance.post(`/users/friend-request/${userId}`)

 return response.data
  }
 
  export const getFriendRequests= async()=>{
    const response= await axiosInstance.get(`/users/friend-requests`);
    console.log(response.data);
 return response.data
  }

  export const acceptFriendRequests= async(requestId)=>{
    const response= await axiosInstance.put(`/users/friend-request/${requestId}/accept`)

 return response.data
  }
  
  export const getStreamToken= async()=>{
    const response= await axiosInstance.get(`/chats/token`)
     return response.data
  }