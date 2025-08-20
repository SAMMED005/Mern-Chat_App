import User from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import generatetokenandsetcookie from "../utils/generatetoken.js";
export const signup=async(req,res)=>{
    // console.log("signup")
    try {
        const{fullname,username,password,confirmpassword,gender}=req.body;
        if(password!=confirmpassword){
            return res.status(400).json({error:"passwords doesnt match"})
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(500).json({error:"user already exihsts"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        const boyprofilepic=`https://avatar.iran.liara.run/public/boy/?username=${username}`
        const girlprofilepic=`https://avatar.iran.liara.run/public/girl/?username=${username}`

        const newuser=new User({
            fullname,
            username,
            password:hashedpassword,
            gender,
            profilepic:gender==="male"?boyprofilepic:girlprofilepic })

            
           if(newuser){
            generatetokenandsetcookie(newuser._id,res)
            await newuser.save();
            res.status(201).json({
                _id:newuser.id,
                fullname:newuser.fullname,
                username:newuser.username,
                profilepic:newuser.profilepic
            })
           }
           else{
            res.status(400).json({error:"Invalid userdata"})
           }
    } catch (error) {
        console.log("something went wrong "+error)
        res.status(500).json({error:"internal server error"})
    }

 }

export const login=async(req,res)=>{
    // console.log("login")

try {
    const{username,password}=req.body;
    const user=await User.findOne({username})
    const ispasswordcorrect=await bcrypt.compare(password,user?.password||"")
    if(!user||!ispasswordcorrect){
        return res.status(400).json({error:"Invalid username or password"})
    }
    //console.log("before generation of accesstoken")
    generatetokenandsetcookie(user._id,res)
   // console.log("after generation of accesstoken")
    res.status(201).json({
        _id:user.id,
        fullname:user.fullname,
        username:user.username,
        profilepic:user.profilepic
    })
} catch (error) {
    console.log("something went wrong in login"+error)
    res.status(500).json({error:"internal server error"})
}

 }
 
//  export const logout=async(req,res)=>{
//     console.log("logout")
//     try {
//         res.cookie("jwt","",{maxAge:0})
//         res.status(200).json({message:"logged out succesfully"})
//     } catch (error) {
//         console.log("something went wrong in logout"+error)
//     res.status(500).json({error:"internal server error"})
//     }
//  }
export const logout = async (req, res) => {
    console.log("Logging out...");

    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "None", // Required for cross-origin cookies
            expires: new Date(0) // Ensures the cookie is removed
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Something went wrong in logout:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
