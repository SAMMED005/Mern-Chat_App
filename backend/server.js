import express from 'express'
import dotenv from "dotenv"
import authRoute from './routes/auth.routes.js'
import connecttomongodb from './db/connecttomongodb.js'
import  messageRoutes  from './routes/message.routes.js'
import  userRoutes  from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
// import cors from "cors";
import { app,server} from './sockets/sockets.js'
// const app=express()
dotenv.config();
app.use(express.json())
// app.use(cors({
//     origin: "http://localhost:5000", // Allow frontend origin
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true, 
//     // allowedHeaders: "Content-Type"
// }));
app.use(cookieParser())
const PORT=process.env.PORT||3000;
// const PORT=8000
app.use('/api/auth',authRoute)
app.use('/api/auth/message',messageRoutes);
app.use('/api/users',userRoutes);
server.listen(PORT,()=>{
    connecttomongodb();
    console.log("port running on localhost:"+PORT)
})