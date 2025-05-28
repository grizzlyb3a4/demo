"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = React.useState("nothing")
    const logout= async () => {
       try {
        await axios.get("/api/users/logout")
        toast.success("Logout successful");
        router.push("/login");

       } catch (error:any) {
           console.log(error.message);
           toast.error(error.message);
       }
    }
    const getUserData = async () => {
        const res= await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);

    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <h2
            className="p-3 rounded bg-green-300"
            >{data==='nothing'?"Nothing":<Link
            href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <p>This is a placeholder for the profile page.</p>
            <p>You can add user-specific information here.</p>
            <hr />
            <button
            onClick={logout}
            className="bg-blue-400 mt-4 hover:bg-blue-800
            text-white font-bold py-2 px-4 rounded"
            >Logout</button>
            <button
            onClick={getUserData}
            className="bg-pink-400 mt-4 hover:bg-red-800
            text-white font-bold py-2 px-4 rounded"
            >GET USER DETAILS</button>
        </div>
    )
}