"use client";
import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';



export default function SignUpPage() {
    const router= useRouter();
    const [user, setUser]= React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled, setButtonDisabled]= React.useState(false);
    const [loading, setLoading]= React.useState(false);

    const onSignup= async()=>{
      try {
        setLoading(true);
        const response= await axios.post("/api/users/signup", user)
        console.log("SignUp Success",response.data);
        router.push("/login");
        
      } catch (error:any) {
        console.log("SignUp failed", error.message);
        toast.error(error.message);
      }finally{
        setLoading(false);
      }

    }
    

    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setButtonDisabled(false);
    }else setButtonDisabled(true);
}, [user]);


    return(
        <div className="flex flex-col items-center
        justify-center min-h-screen py-2">
          <h1>{loading?"Processing":"SignUp"}</h1>
          <hr />
          <label htmlFor="username">username</label>
          <input
          id='username'
          className='text-black p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-blue-500'
          value={user.username}
          onChange={(e)=>setUser({...user, username:e.target.value})}
          placeholder='Enter your password'
          type="text" />
          <label htmlFor="email">email</label>
          <input
          id='email'
          className='text-black  p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-blue-500'
          value={user.email}
          onChange={(e)=>setUser({...user, email:e.target.value})}
          placeholder='Enter your email'
          type="text" />
          <label htmlFor="password">password</label>
          <input
          id='password'
          className='text-black p-2 border border-gray-300 rounded-lg
          mb-4 focus:outline-none focus:border-blue-500'
          value={user.password}
          onChange={(e)=>setUser({...user, password:e.target.value})}
          placeholder='Enter your password'
          type="password" />
          <button
          onClick={onSignup}
          className='p-2 border border-gray-300
          rounded-lg mb-4 focus:outline-none
          focus:border-gray-600'>{buttonDisabled? "NO SIGNUP":"HELL YEAH" }</button>
          <Link href="/login">Visit login Page</Link>
        </div>
    )
}