"use client";

// import User from "@/models/userModel";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {toast,Toaster} from "react-hot-toast";

export default function signUp() {
  const notify = () => toast.success("user created successfully");

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("SignUp success...", response.data);
      router.push("/login")
    } catch (error: any) {
      console.log("SignUp failed!: ", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="bg-gray-900 text-zinc-300 flex justify-center items-center h-screen">

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      
        <h1 className="text-2xl font-semibold mb-4">
          {loading ? "processing" : "SignUp"}
        </h1>
        <form onSubmit={onSignUp}>
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
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
            {buttonDisabled ? "no Signup" : "SignUp"}
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/login" className="hover:underline">
            Login here
          </Link>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
