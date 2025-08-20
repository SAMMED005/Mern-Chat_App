import User from '../models/usermodel.js'
export const getusersforsidebar=async(req,res)=>{
try {
    const loggedinuserid=req.user._id;
    // console.log("logged in user:",loggedinuserid)
    const fiteredusers=await User.find({_id:{$ne:loggedinuserid}}).select("-password");
    res.status(200).json(fiteredusers)
} catch (error) {
    console.log("get users for sidebars"+error.message)
    res.status(500).json({error:"server internal error"})

  }
}