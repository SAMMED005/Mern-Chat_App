import Message from '../models/message.models.js'
import Conversation from '../models/conversation.models.js'
import { getreceiversocketid } from '../sockets/sockets.js';
import {io} from '../sockets/sockets.js'
export const sendmessage=async(req,res)=>{
try {
    const {message}=req.body;
    const {id:receiverid}=req.params;
    const senderid=req.user._id;
    let conversation=await Conversation.findOne({
        participants:{$all:[senderid,receiverid]}
    })
    console.log("1")
    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderid,receiverid]
        })
    }
    
    const newmessage=new Message({
        senderid,
        receiverid,
        message
    })
    
    if(newmessage){
        conversation.messages.push(newmessage._id)
    }
   
    // await conversation.save();
    // await newmessage.save();
    await Promise.all([conversation.save(),newmessage.save()])
    const receiversocketid=getreceiversocketid(receiverid)
    if(receiversocketid){
        io.to(receiversocketid).emit("newMessage",newmessage)
    }
    res.status(200).json(newmessage)
} catch (error) {
    console.log("error in sending message"+error.message)
    res.status(400).json({
        message:"Internal server error "
    })
}
}

export const getmessages=async(req,res)=>{
    try {
        const {id:usertochatid}=req.params;
        const senderid=req.user._id
        const conversation=await Conversation.findOne({
            participants:{$all:[senderid,usertochatid]}
        }).populate("messages")
        if(!conversation)return res.status(200).json([])
            const messages =conversation.messages;
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in sending message"+error.message)
        res.status(400).json({
            message:"Internal server error "
        })
    }
}