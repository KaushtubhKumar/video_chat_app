// import React from 'react'
// import useAuthUser from '../hooks/useAuthUser'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react';
// import { getOutgoingFriendReqs, getRecommededUsers, getUserFriends, sendFriendRequest } from '../lib/api';
// import { useEffect } from 'react';
// import { Link, MapPinIcon, UsersIcon } from 'lucide-react';
// import NoFriendFound from '../components/NoFriendFound';

// function Homepage() {
//   const {authUser}=useAuthUser();

//   const queryClient=useQueryClient();
//   const[outgoingRequestsid,setoutgoingReqquestsid]=useState([new Set()]);

//   const {data:friends=[],isLoading:loadingFriends}=useQuery({
//     queryKey:["friends"],
//     queryFn:getUserFriends
//   })

//   const {data:recommendedUsers=[],isLoading:loadingUsers}=useQuery({
//     queryKey:["users"],
//     queryFn:getRecommededUsers
//   })

//    const {data:outgoingFriendReqs=[],isLoading:loadingRequests}=useQuery({
//     queryKey:["outgoingFriendReqs"],
//     queryFn:getOutgoingFriendReqs
//   })

//   const {mutate:sendRequestMutation,isPending}=useMutation({
//     mutationFn:sendFriendRequest,
//     onSuccess:()=>{queryClient.invalidateQueries({queryKey:["outgoingFriendReqs"]})}
//   })

//   useEffect(()=>{
//   const outgoingIds= new Set()

//   if(outgoingFriendReqs && outgoingFriendReqs.length>0){
//     outgoingFriendReqs.forEach((req)=>{
//       outgoingIds.add(req.id);
//     })
//     setoutgoingReqquestsid(outgoingIds)
//   }
//   },[outgoingFriendReqs])



//   return (
//     <div className='p-4 sm:p-6 lg:p-8'>
//       <div className='container mx-auto space-y-10'>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>
        
//         {loadingFriends?(
//           <div className='flex justify-center py-12'> 
//            <span className='loading loading-spinner loading-lg'></span>
//           </div>
//         ):friends.length===0?(
//           <NoFriendFound/>
//         ):(
//           <div className='grid grid-cols-1 sm:grid-cols-2 
//           lg:grid-cols-3 xl:grid-cols-4 gap-4'>
//           {friends.map((friend)=>(
         
//          <FriendCard key={friend._id} friend={friend}/>
//           )
//           )}

//           </div>
//         )}

//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your profile
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {loadingUsers?(
//             <div className='flex justify-center py-12'>
//             <span className='loading loading-spinner loading-lg'></span>
//             </div>
//           ):recommendedUsers.length===0?(
//            <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//            </div>
//           ):(
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
//             gap-6'>
//              {recommendedUsers?.map((user)=>{
//                 const hasRequestBeenSent= outgoingRequestsid.has(user._id)

//                 return(
//                   <div key={user._id} className='card bg-base-200 hover:shadow-lg transition-all
//                   duration-300'>

//                   <div className='card body p-5 space-y-4'>
//                     <div className='flex items-center gap-3'>
//                      <div className='avatar size-16 rounded-full'>
//                       <img src={user.profilePic}
//                            alt={user.fullName}/>
//                      </div>

//                      <h3 className='font-semibold text-lg'>
//                       {user.fullName}
//                      </h3>
//                      {user.location && (
//                       <div className='flex items-center text-xs opacity-70 mt-1'>
//                          <MapPinIcon className='size-3 mr-1'/>
//                          {user.location}
//                       </div>
//                      )}

//                     </div>
//                   </div>

//                   </div>
//                 )
// })}

//             </div>
//           )}
//           </section>
//       </div>
//     </div>
//   )
// }

// export default Homepage

import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react';
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';
import { useEffect } from 'react';
import { CheckCircleIcon, MapPinIcon, UserRoundPlusIcon, UsersIcon } from 'lucide-react';
import NoFriendFound from '../components/NoFriendFound';
import FriendCard,{getLanguageFlag} from '../components/FriendCard';
import { Link } from 'react-router';

function Homepage() {
  const {authUser}=useAuthUser();

  const queryClient=useQueryClient();
  const[outgoingRequestsid,setoutgoingReqquestsid]=useState(new Set());

  const {data:friends=[],isLoading:loadingFriends}=useQuery({
    queryKey:["friends"],
    queryFn:getUserFriends
  })

  // Fixed: Added select to ensure we always get an array
  // const {data:recommendedUsers=[],isLoading:loadingUsers}=useQuery({
  //   queryKey:["users"],
  //   queryFn:getRecommendedUsers,
  // })
  
  // console.log("🧠 Recommended users (after select):", recommendedUsers);

  const {
  data: recommendedUsers = [],
  isLoading: loadingUsers,
  isError,
} = useQuery({
  queryKey: ["users"],
  queryFn: getRecommendedUsers,
});

console.log("💡 Recommended users from React Query:", recommendedUsers);


   const {data:outgoingFriendReqs=[],isLoading:loadingRequests}=useQuery({
    queryKey:["outgoingFriendReqs"],
    queryFn:getOutgoingFriendReqs
  })

  const {mutate:sendRequestMutation,isPending,variables}=useMutation({
    mutationFn:sendFriendRequest,
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:["outgoingFriendReqs"]})}
  })

  useEffect(()=>{
    const outgoingIds= new Set()

    if(outgoingFriendReqs && outgoingFriendReqs.length>0){
      outgoingFriendReqs.forEach((req)=>{
        console.log(req)
        outgoingIds.add(req.recipient._id);
      })
      setoutgoingReqquestsid(outgoingIds)
    }
  },[outgoingFriendReqs])


  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>
        
        {loadingFriends?(
          <div className='flex justify-center py-12'> 
           <span className='loading loading-spinner loading-lg'></span>
          </div>
        ):friends.length===0?(
          <NoFriendFound/>
        ):(
          <div className='grid grid-cols-1 sm:grid-cols-2 
          lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {friends.map((friend)=>(
            <FriendCard key={friend._id} friend={friend}/>
          ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>
          
          {loadingUsers?(
            <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'></span>
            </div>
          ):recommendedUsers.length===0?(
           <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
           </div>
          ):(
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
             {/* Fixed: Added Array.isArray check for extra safety */}
             {Array.isArray(recommendedUsers) && recommendedUsers.map((user)=>{
                const hasRequestBeenSent= outgoingRequestsid.has(user._id)

                const isThisUserPending = isPending && variables === user._id

                return(
                  <div key={user._id} className='card bg-base-200 hover:shadow-lg transition-all duration-300'>
                    <div className='card-body p-5 space-y-4'>
                      <div className='flex items-center gap-3'>
                        <div className='avatar size-16 rounded-full'>
                          <img src={user.profilePic}
                               alt={user.fullName}/>
                        </div>

                        <div>
                          <h3 className='font-semibold text-lg'>
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className='flex items-center text-xs opacity-70 mt-1'>
                              <MapPinIcon className='size-3 mr-1'/>
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* languages flags */}
                      
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitalize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitalize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && (
                        <p className='text-sm opacity-70'>
                          {user.bio}
                        </p>)}

                        {/* <button className={`btn btn-w-full mt-2 ${hasRequestBeenSent
                          ? 'btn-disabled':'btn-primary'
                        }`}
                        onClick={()=>{sendRequestMutation(user._id)}}
                        disabled={hasRequestBeenSent || isPending}>

                          {hasRequestBeenSent?(
                            <>
                            <CheckCircleIcon className='size-4 mr-2'/>
                             REQUEST SENT
                            </>
                          ):(
                            <>
                            <UserRoundPlusIcon className='size-4 mr-2'/>
                            SEND FRIEND REQUEST
                            </>
                          )}
                        </button> */}
<button
  className={`btn btn-w-full mt-2 ${
    hasRequestBeenSent ? "btn-disabled" : "btn-primary"
  }`}
  onClick={() => {
    sendRequestMutation(user._id);
  }}
  // FIX 1: Use the new variable
  disabled={hasRequestBeenSent || isThisUserPending}
>
  {/* FIX 2: Add a specific "Sending..." state */}
  {hasRequestBeenSent ? (
    <>
      <CheckCircleIcon className="size-4 mr-2" />
      REQUEST SENT
    </>
  ) : isThisUserPending ? (
    <>
      <span className="loading loading-spinner loading-xs mr-2"></span>
      SENDING...
    </>
  ) : (
    <>
      <UserRoundPlusIcon className="size-4 mr-2" />
      SEND FRIEND REQUEST
    </>
  )}
</button>
                        
                    </div>
                  </div>
                )
             })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}


export default Homepage

export const capitalize=(str)=>{
   return str.charAt(0).toUpperCase()+ str.slice(1)
} 