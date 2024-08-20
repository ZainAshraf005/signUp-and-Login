"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";


export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState("");

  const onLogin = async(e: React.FormEvent<HTMLFormElement>)=> {
    try {
      e.preventDefault();
      setLoading("processing...")
      const response = await axios.post('/api/user/login', user)
      console.log("login success: ",response.data)
      toast.success('logged in successfuly')
      setTimeout(() => {
        router.push(`/profile/${user.password}`)
      }, 1000);
      
    } catch (error: any) {
      console.log("login failed:",error.response.data)
      toast.error(error.response.data)

    }finally{
      setLoading("transfering to your profile")
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="bg-gray-900 text-zinc-300 flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">
          {loading}
        </h1>
        <form onSubmit={onLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full border bg-transparent border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full border bg-transparent border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            disabled={buttonDisabled}
            type="submit"
            className="bg-blue-500 disabled:bg-zinc-500 disabled:cursor-not-allowed hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {buttonDisabled ? "no Login" : "Login"}
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/signup" className="hover:underline">
            SignUp here
          </Link>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
