// import React from 'react'
// import useAuthUser from '../hooks/useAuthUser.js'
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import  { LoaderIcon, toast } from 'react-hot-toast'
// import { completeOnboarding } from '../lib/api.js';
// import { CameraIcon, MapIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
// import { useState } from 'react';
// import axios from 'axios';
// import { LANGUAGES,THEMES } from '../constants/index.js';
// import Avatar from '../Avatar.jsx';
// import multiavatar from '@multiavatar/multiavatar';

// function OnboardingPage() {

//  const {authUser}=useAuthUser();
//  const queryClient=useQueryClient();
//  const [formState, setFormState] = useState({
//     fullName: authUser?.user.fullName || "",
//     bio: authUser?.bio || "",
//     nativeLanguage: authUser?.nativeLanguage || "",
//     learningLanguage: authUser?.learningLanguage || "",
//     location: authUser?.location || "",
//     profilePic: authUser?.user.profilePic || "",
//   });

// const {mutate:onboardingMutation,isPending }=useMutation({
//  mutationFn: completeOnboarding,
//  onSuccess:()=>{
//   toast.success("Profile Onboarded Successfully")
//  queryClient.invalidateQueries({queryKey:["authUser"]})
//  },
//  onError:(error)=>console.log(error)
// })


// const handleSubmit=(e)=>{
//     e.preventDefault();
//     onboardingMutation(formState)
// }

// const handleRandomAvatar = () => {
//   const randomId = Math.floor(Math.random() * 10000000);
//   const svgCode = multiavatar(randomId);
//   const base64 = btoa(svgCode);
//   const dataUri = `data:image/svg+xml;base64,${base64}`;

//   // Update the profilePic field in formState
//   setFormState({ ...formState, profilePic: dataUri });
// };


//   return (
//     <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
//     <div className='card bg-base-100 w-full max-w-3xl shadow-xl'>
//       <div className='card-body p-6 sm:p-8'>
//         <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
//           Complete Your Profile
//         </h1>
//              <form onSubmit={handleSubmit} className='space-y-6'>
//               {/* profilepic container */}
//              <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="size-32 rounded-full overflow-hidden border border-base-300">
//               {formState.profilePic?(
//              <img src={formState.profilePic}
//                   alt="profile preview"
//                   className='w-full h-full object-cover'/>
//               ):(
//                 <div className='flex items-center justify-center h-full'>
//                 <CameraIcon className='size-12 text-base-content opacity-50'/>
//                 </div>
//               )}
             
             
//              </div>

//              <div className='flex items-center gap-2'>
//               <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
//                 <ShuffleIcon className='size-4 mr-2'/>
//                 GENERATE RANDOM AVATAR
//               </button>
//              </div>


//              </div>
//               {/* FULL NAME */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Full Name</span>
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formState.fullName}
//                 onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
//                 className="input input-bordered w-full"
//                 placeholder="Your full name"
//               />
//             </div>

//              {/* BIO */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Bio</span>
//               </label>
//               <textarea
//                 name="bio"
//                 value={formState.bio}
//                 onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
//                 className="textarea textarea-bordered h-24"
//                 placeholder="Tell others about yourself and your language learning goals"
//               />
//             </div>
  
//   {/* languages */}
//          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//         {/* native language */}
//         <div className='form-control'>
//         <label className='label'>
//         <span className='label-text'>NATIVE LANGUAGE</span>
//         </label>
//         <select name='nativeLanguage'
//         value={formState.nativeLanguage}
//         onChange={(e)=>{setFormState({...formState,nativeLanguage:e.target.value})}}
//         className='select select-bordered w-full'>
          
//         <option value="">SELECT YOUR LANGUAGE</option>
//         {LANGUAGES.map((lang)=>(
//           <option key={`native-${lang}`} value={lang.toLowerCase()}>
//           {lang}
//           </option>
//         ))
//         }
//         </select>
//         </div>
        
//         {/* learning language */}
//         <div className='form-control'>
//         <label className='label'>
//         <span className='label-text'>LEARNING LANGUAGE</span>
//         </label>
//         <select name='nativeLanguage'
//         value={formState.nativeLanguage}
//         onChange={(e)=>{setFormState({...formState,learningLanguage:e.target.value})}}
//         className='select select-bordered w-full'>
          
//         <option value="">SELECT LEARNING LANGUAGE</option>
//         {LANGUAGES.map((lang)=>(
//           <option key={`learning-${lang}`} value={lang.toLowerCase()}>
//           {lang}
//           </option>
//         ))
//         }
//         </select>
//         </div>
//          </div>

//          {/* location */}
//         <div className='form-control'>
//           <label className='label'>
//             <span className='label-text'>LOCATION</span>
//           </label>
//           <div className='relative'>
//             <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3
//             size-5 text-base-content opacity-70'/>

//             <input  type='text'
//             name='location'
//             value={formState.location}
//             onChange={(e)=>{setFormState({...formState,location:e.target.value})}}
//             className='input input-bordered w-full pl-10'
//             placeholder='New Delhi,India'/>
//           </div>
//         </div>
//           {/* submit button */}

//         <button className='btn btn-primary w-full'disabled={isPending} 
//         type='submit'>
        
//         {!isPending?(
//           <>
//           <ShipWheelIcon className='size-5 mr-2'/>
//           COMPLETE ONBOARDING
//           </>
//         ):(
//           <>
//           <LoaderIcon className='animate-spin size-5 mr-2'/>
//           Onboarding..
//           </>
//         )}

//         </button>
//              </form>
//       </div>
//     </div> 
//     </div>
//   )
// }








// export default OnboardingPage

// import React, { useState, useEffect } from 'react';
// import useAuthUser from '../hooks/useAuthUser';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast';
// import { completeOnboarding } from '../lib/api';
// import { CameraIcon } from 'lucide-react';

// function OnboardingPage() {
//   const { authUser } = useAuthUser();
//   const queryClient = useQueryClient();
//   const [formState, setFormState] = useState({
//     fullName: "",
//     bio: "",
//     nativeLanguage: "",
//     learningLanguage: "",
//     location: "",
//     profilePic: "",
//   });

//   console.log(authUser)

//   // Update formState when authUser loads
//   useEffect(() => {
//     if (authUser?.user) {
//       const user = authUser.user;
//       console.log('User data:', user);
//       console.log('profilePic:', user.profilePic);
//       setFormState({
//         fullName: user.fullName || "",
//         bio: user.bio || "",
//         nativeLanguage: user.nativeLanguage || "",
//         learningLanguage: user.learningLanguage || "",
//         location: user.location || "",
//         profilePic: user.profilePic || "",
//       });
//     }
//   }, [authUser]);

//   const { mutate: onboardingMutation, isPending } = useMutation({
//     mutationFn: completeOnboarding,
//     onSuccess: () => {
//       toast.success("Profile Onboarded Successfully");
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     }
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onboardingMutation(formState);
//   };

//   return (
//     <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
//       <div className='card bg-base-100 w-full max-w-3xl shadow-xl'>
//         <div className='card-body p-6 sm:p-8'>
//           <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
//             Complete Your Profile
//           </h1>
//           <form onSubmit={handleSubmit} className='space-y-6'>
//             {/* profilepic container */}
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-base-300'>
//                 {formState.profilePic ? (
//                   <img 
//                     src={formState.profilePic}
//                     alt="profile preview"
//                     className='w-full h-full object-cover'
//                     onError={(e) => {
//                       console.error('Image failed to load:', formState.profilePic);
//                     }}
//                     onLoad={() => {
//                       console.log('Image loaded successfully');
//                     }}
//                   />
//                 ) : (
//                   <div className='flex items-center justify-center h-full bg-base-200'>
//                     <CameraIcon className='size-12 text-base-content opacity-50'/>
//                   </div>
//                 )}
//               </div>
//               {/* Debug info */}
//               <div className='text-xs text-gray-500'>
//                 {formState.profilePic ? `Has profilePic: ${formState.profilePic.substring(0, 50)}...` : 'No profilePic'}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div> 
//     </div>
//   );
// }

// export default OnboardingPage;

import React, { useEffect, useState } from 'react'
import useAuthUser from '../hooks/useAuthUser.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoaderIcon, toast } from 'react-hot-toast'
import { changeAvatar, completeOnboarding } from '../lib/api.js'
import { CameraIcon, Heart, LucideSave, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react'
import axios from 'axios'
import { LANGUAGES } from '../constants/index.js'
import multiavatar from '@multiavatar/multiavatar'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router'
import { FaHeart } from 'react-icons/fa';


function OnboardingPage() {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.user.fullName || "",
    bio: authUser?.user.bio || "",
    nativeLanguage: authUser?.user.nativeLanguage || "",
    learningLanguage: authUser?.user.learningLanguage || "",
    location: authUser?.user.location || "",
    profilePic: authUser?.user.profilePic || "",
  })

const [savedAvatars, setSavedAvatars] = useState(() => {
  const stored = localStorage.getItem('savedAvatars');
  return stored ? JSON.parse(stored) : [];
});

const avatarsString = localStorage.getItem('savedAvatars');
let Avatararray= JSON.parse(avatarsString);

const [isSaved, setIsSaved] = useState(false);

const toggleHeart = () => setIsSaved((prev) => !prev);

useEffect(() => {
  localStorage.setItem('savedAvatars', JSON.stringify(savedAvatars));
}, [savedAvatars]);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarded Successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError:(error)=>{console.error(error.response)
      toast.error("User Error: Please fill all the fields");
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formState)
    onboardingMutation(formState)
  }
var dataUri;
  // Generate random avatar when button pressed
  const handleRandomAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000000)
    const svgCode = multiavatar(randomId)
    const base64 = btoa(svgCode)
     dataUri = `data:image/svg+xml;base64,${base64}`

    setFormState({ ...formState, profilePic: dataUri })
  }  

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-100 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* Profile Picture */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full overflow-hidden border border-base-300">
                
                <AnimatePresence mode="wait">
                  {formState.profilePic ? (
                    <motion.img
                      key={formState.profilePic}
                      src={formState.profilePic}
                      alt="profile preview"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  ) : (
                    <motion.div
                      key="placeholder"
                      className="flex items-center justify-center h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CameraIcon className="size-12 text-base-content opacity-50" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

           <FaHeart
  className={`w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110 ${
    isSaved ? "text-red-500" : "text-gray-400"
  }`}

  onClick={() => {
    toggleHeart();
  console.log(savedAvatars)
  // localStorage.clear();
    if (formState.profilePic && !savedAvatars.includes(formState.profilePic)) {
      setSavedAvatars([...savedAvatars, formState.profilePic]);
      toast.success("Avatar saved ❤️");
    } else {
      toast("Already saved or empty!", { icon: "⚠️" });
    }
  }}
/>

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  onClick={handleRandomAvatar}
                  className='btn btn-accent'
                >
                  <ShuffleIcon className='size-4 mr-2' />
                  GENERATE RANDOM AVATAR
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* Languages */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Native Language */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>NATIVE LANGUAGE</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value="">SELECT YOUR LANGUAGE</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Learning Language */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>LEARNING LANGUAGE</span>
                </label>
                <select
                  name='learningLanguage'
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value="">SELECT LEARNING LANGUAGE</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>LOCATION</span>
              </label>
              <div className='relative'>
                <MapPinIcon
                  className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70'
                />
                <input
                  type='text'
                  name='location'
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className='input input-bordered w-full pl-10'
                  placeholder='New Delhi, India'
                />
              </div>
            </div>

            {/* Submit */}
            <button
              className='btn btn-primary w-full'
              disabled={isPending}
              type='submit'
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className='size-5 mr-2' />
                  COMPLETE ONBOARDING
                </>
              ) : (
                <>
                  <LoaderIcon className='animate-spin size-5 mr-2' />
                  Onboarding...
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
