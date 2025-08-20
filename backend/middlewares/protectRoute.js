import jwt from "jsonwebtoken"
import User from '../models/usermodel.js'
const protectRoute=async(req,res,next)=>{
    try {
        // console.log("testing if request has cookie")
        // console.log(req.cookies.jwt)
           const token =req.cookies.jwt;
           if(!token){
            return res.status(401).json({error:"Unathorised request - no token provided"})
           }
           const decoded=jwt.verify(token,process.env.JWT_SECRET);
           if(!decoded){
            return res.status(401).json({error:"Unathorised request - invalid token here"})
           }
           const user=await User.findById(decoded.userid).select("-password")
           if(!user){
            return res.status(401).json({error:"user not found"})
           }
           req.user=user;
           next();

    } catch (error) {
        console.log("error occured in middleware "+error.message);
        res.status(500).json({error:"Internal server error"})
    }
};
export default protectRoute;