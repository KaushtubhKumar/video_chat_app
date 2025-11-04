import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants';
import { Link } from 'react-router';


function FriendCard({friend}) {
  return (
    <div className='card bg-base-200 hover:shadow-md transition-shadow'>
    <div className='card-body p-4'>
    
    {/* user info */}
    <div className='flex items-center gap-3 mb-3'>
       <div className='avatar size-12'>
        <img src={friend.profilePic} alt={friend.fullName}/>
       </div>
       <h3 className='font-semibold text-xl truncate'>
        {friend.fullName}
       </h3>
       </div>
    <div className='flex flex-col items-center gap-2 mb-2'>

     <span className='badge badge-secondary text-xs'>
    {getLanguageFlag(friend.nativeLanguage)}
     Native:{friend.nativeLanguage}
     </span>

     <span className='badge badge-secondary text-xs'>
    {getLanguageFlag(friend.learningLanguage)}
     Learning:{friend.learningLanguage}
     </span>
    </div>

<Link to={`/chat/${friend._id}`} className='btn btn-outline w-full'>
MESSAGE</Link>


    </div>
    </div>
  )
}

export default FriendCard

// FriendCard.jsx

export const getLanguageFlag = (lang) => {
  if (!lang) return null;

  const langlower = lang.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langlower]; 

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/${countryCode}.svg`}
        alt={`${langlower} flag`}
        className='h-3 mr-1 inline-block'
      />
    );
  }
  return null;
};
