import React from 'react';
import multiavatar from '@multiavatar/multiavatar';
import { useState } from 'react';

function Avatar({ userId:initialId, size = 200 }) {
  // 1. Generate the raw SVG code as a string
  
  const[userid,setuserid]=useState(initialId ||Math.floor(Math.random()*100000));
  const svgCode = multiavatar(userid);

  // 2. Encode the SVG string into Base64
  const base64 = btoa(svgCode);

  // 3. Create the Data URI
  const dataUri = `data:image/svg+xml;base64,${base64}`;
function changeprofilepic(){
  setuserid(Math.floor(Math.random()*100000))
}

  // 4. Use the Data URI in a standard img tag. No innerHTML needed!
  return (
    <img onClick={changeprofilepic}
      src={dataUri}
      alt={initialId}
      width={size}
      height={size}
    />
  );
}


export default Avatar;