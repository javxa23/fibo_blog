"use client"
import axios from "axios";
import React, { useState } from "react";
import Cookie from "js-cookie";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:8080/login", { email, password })
            .then(response => {
                console.log(response.data.message)
                setMessage("");
                if (response.data.user_id) {
                    Cookie.set("user_id", response.data.user_id, { expires: 7 });
                    Cookie.set("username", response.data.username, { expires: 7 });
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log("Registration failed:", error.response.data.error)
                setMessage(error.response.data.error);
            });
    };
    return (
        <div className="flex items-center justify-center flex-1 overflow-auto">
            <div className="max-w-md w-full rounded-lg p-6 border border-white/40 backdrop-blur-md z-[1]">
                <h1 className="text-2xl font-grotesk text-white mb-6">
                    Welcome back!
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            maxLength={100}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex w-full border shadow-sm transition-colors file:border-0 file:bg-transparent 
                            file:text-sm file:font-medium text-white placeholder:text-zinc-500 focus-visible:outline-none 
                            focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50
                          dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 border-zinc-600 bg-[#2F2E2E]
                             dark:border-zinc-600 dark:bg-[#2F2E2E] text-lg px-6 py-3 font-thin rounded-lg"
                            required />
                    </div>

                    <div className="mb-6">
                        <input type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            maxLength={70}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex w-full border shadow-sm transition-colors file:border-0 file:bg-transparent 
                            file:text-sm file:font-medium text-white placeholder:text-zinc-500 focus-visible:outline-none 
                            focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50
                          dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 border-zinc-600 bg-[#2F2E2E]
                             dark:border-zinc-600 dark:bg-[#2F2E2E] text-lg px-6 py-3 font-thin rounded-lg"
                            required />
                    </div>
                    <p className="font-grotesk text-red-500">{message}</p>

                    <div className="relative w-auto flex justify-center">
                        <div className="p-[1px] bg-gradient-to-br from-yellow-500 to-orange-500 rounded-md w-fit relative z-[1] duration-300">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md font-medium transition-colors 
                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 
                            disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300
                             hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9
                              text-white bg-zinc-800 px-12 py-6 text-lg">LOGIN
                            </button>
                        </div>
                        <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-pink-500 shadow-lg blur-xl 
                        w-[170px] absolute inset-x-0 mx-auto h-14 opacity-90 animate-wavy">
                        </div>
                    </div>
                </form>
            </div>
            <img alt="Circle" width="450" height="450" decoding="async" data-nimg="1" className="z-[0] absolute top-60 right-36" src="/assets/circle.svg"></img>
            <div className="bg-orange-500 blur-3xl z-[0] rounded-full bg-opacity-20 absolute top-32 left-80    w-52 h-52"></div>
        </div>
    );
};

export default Login;
