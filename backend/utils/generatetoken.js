import jwt from 'jsonwebtoken'

const generatetokenandsetcookie=(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
    // console.log(token)
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        SameSite:"Strict",
        Secure:false
        // secure:true
    })
    // console.log("cookies set")
}
export default generatetokenandsetcookie;