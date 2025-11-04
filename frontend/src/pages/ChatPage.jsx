// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import useAuthUser from '../hooks/useAuthUser';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { getStreamToken } from '../lib/api';
// import { StreamChat } from 'stream-chat';

// import {
//   Chat,
//   Channel,
//   ChannelList,
//   Window,
//   ChannelHeader,
//   MessageList,
//   MessageInput,
//   Thread,
//   useCreateChatClient,
// } from "stream-chat-react";

// import toast from 'react-hot-toast';
// import ChatLoader from '../components/ChatLoader';

// const STREAM_API_KEY=import.meta.VITE_STREAM_API_KEY

// function ChatPage() {

//   const {id:targetUserId}=useParams();
//   console.log(targetUserId)


//   const [chatClient,setChatClient]=useState(null);
//   const [channel,setChannel]=useState(null);
//   const [loading,setloading]=useState(true);

//   const queryClient=useQueryClient();
//   const {authUser}=useAuthUser();


//   const {data:tokenData}=useQuery({
//     queryKey:["streamToken"],
//     queryFn:getStreamToken,
//     retry:false,
//     enabled:!!authUser
//   });
  
//   console.log(authUser);
// useEffect(()=>{
//   const initChat=async ()=>{
//     if(!tokenData?.token || authUser ) return;

//     try {
//       console.log('initialsing stream chat client');

//       const client= StreamChat.getInstance(STREAM_API_KEY)

//       await client.connectUser({
//         id:authUser._id,
//         name:authUser.fullName,
//         image:authUser.profilePic,
//       },tokenData.token)

//       const channelId=[authUser._id,targetUserId].sort().join("-")
     
//       const currentChannel=client.channel("messaging",channelId,{
//         members:[authUser._id,targetUserId._id]
//       })
    
//       await currentChannel.watch()

//       setChatClient(client);
//       setChannel(currentChannel);

//     } catch (error) {
//       console.error("error initializing chats",error);
//       toast.error("Could not connect to chat")
//     }

//     finally{
//       setloading(false)
//     }
//   }
//   initChat();
// },[])

// if(loading || !chatClient || !channel){
//   return <ChatLoader/>
// }
//   return (
//     <div className='h-[93vh]'>
//       <Chat client={chatClient}>
//         <Channel channel={channel}>
//           <div className='w-full relative'>
//             <Window>
//               <ChannelHeader/>
//               <MessageList/>
//               <MessageInput focus/>
//             </Window>
//           </div>
//         </Channel>
//       </Chat>
//     </div>
//   )
// }

// export default ChatPage

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import { StreamChat } from 'stream-chat';
import Callbutton from '../components/Callbutton';


import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";

import toast from 'react-hot-toast';
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/Callbutton';

const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY

function ChatPage() {

  const {id:targetUserId}=useParams();
  console.log(targetUserId)


  const [chatClient,setChatClient]=useState(null);
  const [channel,setChannel]=useState(null);
  const [loading,setloading]=useState(true);

  const queryClient=useQueryClient();
  const {authUser}=useAuthUser();
const user = authUser?.user;

  const {data:tokenData}=useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    retry:false,
    enabled:!!user
  });
  
  // console.log(user);
  console.log(tokenData)
useEffect(()=>{
  const initChat=async ()=>{
    if(!tokenData?.token || !user ) return;

    try {
      console.log('initialsing stream chat client');

      // const client= StreamChat.getInstance(STREAM_API_KEY)

      const client = new StreamChat(STREAM_API_KEY);
    
      await client.connectUser({
        id:user._id,
        name:user.fullName,
        // image:user.profilePic, 
      },tokenData.token)

      const channelId=[user._id,targetUserId].sort().join("-")
     
      const currentChannel=client.channel("messaging",channelId,{
        members:[user._id,targetUserId]
      })
    
      await currentChannel.watch()

      setChatClient(client);
      setChannel(currentChannel);

    } catch (error) {
      console.error("error initializing chats",error);
      toast.error("Could not connect to chat")
    }

    finally{
      setloading(false)
    }
  }
  initChat();
},[tokenData, authUser, targetUserId])


const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };


if(loading || !chatClient || !channel){
  return <ChatLoader/>
}
  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall}/>
           {/* <Callbutton handleVideoCall={handleVideoCall}/> */}
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
        <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage