import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext.jsx";
function handleInputErrors({ fullname, username, password, confirmpassword, gender }) {
    console.log("reached here 1")
	if (!fullname || !username || !password || !confirmpassword || !gender) {
        console.log("reached here 2")
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmpassword) {
        console.log("reached here 3")
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
        console.log("reached here 4")
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
const  useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authUser,setAuthUser}=useAuthContext()
    console.log("test")
    
    const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
        console.log("reached here in signup")
		const success = handleInputErrors({ fullname, username, password, confirmpassword, gender });
      
		if (!success) return;
            setLoading(true)
            console.log("after if success")
try {
    //http://localhost:8000
    const res=await fetch("/api/auth/signup",{
        method:"POST",
        // credentials: 'includ/,
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ fullname, username, password, confirmpassword, gender })

    })
    console.log("reached here after fetch")
    if(res.ok){
    const data= await res.json();
    console.log(data)
    if(data.error){
        throw new Error(data.error)
    }
    localStorage.setItem("chat-user",JSON.stringify(data))
   setAuthUser(data)
    toast.success("successfully registered")}
    else{
        toast.error("user already exhists")
    }
} catch (error) {
    toast.error(error)
    console.log(error)
}
finally{
    setLoading(false)
}

    }
    return {loading,signup};
}

export default useSignup;

