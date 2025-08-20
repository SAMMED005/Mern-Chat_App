import { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import useSignup from '../../hooks/UseSignup.js'
import toast from "react-hot-toast";
const SignUp = () => {
	const [inputs,setinputs]=useState({
		fullname:'',
		username:'',
		password:'',
		confirmpassword:'',
		gender:'',

	})
	const {loading,signup}=useSignup();
	function handlecheckboxchange(gender){
		setinputs({...inputs,gender})
	}
	async function handlesubmit(e){
		e.preventDefault();
		console.log(inputs)
			await signup(inputs)
		
		toast.success("completed ")
	}
	return (
		<div className='flex flex-col items-center justify-center rounded-lg ring-2 ring-white  min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-450 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>
				<h1>{loading}</h1>
				<form onSubmit={handlesubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base text-white label-text'>Full Name :</span>
						</label>
						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10'
						
						value={inputs.fullname}
						onChange={(e)=>setinputs({...inputs,fullname:e.target.value})}
						
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base  text-white label-text'>Username</span>
						</label>
						<input type='text' placeholder='johndoe' className='w-full  input input-bordered h-10'
						
						value={inputs.username}
						onChange={(e)=>setinputs({...inputs,username:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base text-white label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'

							value={inputs.password}
						onChange={(e)=>setinputs({...inputs,password:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base text-white label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'

							value={inputs.confirmpassword}
						onChange={(e)=>setinputs({...inputs,confirmpassword:e.target.value})}
						/>
					</div>

					<GenderCheckbox  onCheckboxChange={handlecheckboxchange} selectedgender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 text-white inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700 bg-blue-600 text-white' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;