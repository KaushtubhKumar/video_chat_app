import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey= process.env.STREAM_API_KEY
const apiSecretKey=process.env.STREAM_SECRET_KEY

if(!apiKey || !apiSecretKey){
    console.error("Stream api key unavailable")
}

const streamClient= StreamChat.getInstance(apiKey,apiSecretKey);

 export const upsertStreamUser= async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData

    } catch (error) {
        console.error("error creating stream user",error);
    }
}

export const generateStreamToken= async (userId) => {
  try {
    const userIdStr= userId.toString();
    return streamClient.createToken(userIdStr)
  } catch (error) {
    console.error("error generating stream token",error);

  }
}