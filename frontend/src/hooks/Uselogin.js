// import React, { useState } from 'react'
// import toast from 'react-hot-toast'
// import { useAuthContext } from '../context/AuthContext';

// const Uselogin=()=> {
//     const [loading,setloading]=useState(false);
//     const{setAuthUser}=useAuthContext();
//     const login=async(username,password)=>{
//         const success = handleInputErrors({  username, password });

    
//         setloading(true);
//         try {
//             const res=await fetch('http://localhost:8000/api/auth/login',{
//                 method:"POST",
//                 credentials: 'include',
//                 headers:{'Content-Type':'application/json'},
//                 body:JSON.stringify({username,password})
//             })
//                 const data=await res.json();
//                 console.log(data)
//             if(data.error){
//                 throw new Error(data.error)
//             }
//             localStorage.setItem("chat-user",JSON.stringify(data))
//             setAuthUser(data)
//             toast.success("login succesfull")
//         } catch (error) {
//             toast.error(error.message)
//         }finally{
//             setloading(false)
//         }


//     }


// return {loading,login};
// }

// export default Uselogin;

// function handleInputErrors({  username, password }) {
//     console.log("reached here 1")
// 	if ( !username || !password ) {
//         console.log("reached here 2")
// 		toast.error("Please fill in all fields");
// 		return false;
// 	}

	
// 	return true;
// }


import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const Uselogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        if (!handleInputErrors({ username, password })) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                // credentials: 'include', // 🔹 Make sure cookies are included
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                throw new Error("Failed to log in");
            }

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default Uselogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
