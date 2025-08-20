import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:5000"],
        methods:["GET","POST"]
    },
});

export const getreceiversocketid=(recieverid)=>{
    return usersocketmap[recieverid]
}

const usersocketmap={};//{userid:socketid}
io.on("connection",(socket)=>{

    console.log("a user connected ",socket.id)
    const userid=socket.handshake.query.userid;
    if(userid!="undefined"){
        usersocketmap[userid]=socket.id
    }
io.emit("getonlineusers",Object.keys(usersocketmap))

socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
    delete usersocketmap[userid];
    io.emit("getonlineusers",Object.keys(usersocketmap))
    
})
})
export {app,io,server};