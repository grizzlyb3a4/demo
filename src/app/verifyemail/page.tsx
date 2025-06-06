"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true);
            
        } catch (error:any) {
            setError(true);
            console.error(error.response.data);
        }
    }

    useEffect(() => {
       const urlToken=window.location.search.split('=')[1];
       setToken(urlToken || '');
       

    }, [token]);
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className="text-4xl">Verify Email</h1>
         <h2 className="p-2 bg-orange-400 text-black">{token?`${token}`:"no token"}</h2>
         {
            verified && (
                <div className="p-2 bg-green-400 text-black">
                    Email verified successfully! You can now <Link href="/login" className="underline">Login</Link>.
                <Link href="login">
               Login</Link>
                </div>
            )
         }
         {
            error && (
                <div className="p-2 bg-red-400 text-black">
                    There was an error<Link href="/login" className="underline">Login</Link>.
                
                </div>
            )
         }
        </div>
    )
}