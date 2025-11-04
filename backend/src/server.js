import express from 'express';
import dotenv from 'dotenv';
import Authrouter from './Routes/authroutes.js';
import connectDB from './Lib/db.js';
import cookieParser from "cookie-parser"
import UserRouter from './Routes/userroutes.js';
import ChatRouter from './Routes/chatrouter.js';
import cors from "cors";
import path from 'path'
dotenv.config();
const app=express();

const PORT= process.env.PORT ;

const __dirname= path.resolve()

app.use(cors({origin:"http://localhost:5173",
    credentials:true,
}))


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",Authrouter);
app.use("/api/users",UserRouter);
app.use("/api/chats",ChatRouter);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
}

app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
})



app.listen(PORT,()=>{
console.log(`SERVER RUNNING ON PORT ${PORT}`)
connectDB();

})


