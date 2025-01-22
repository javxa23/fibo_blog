import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useUser } from '@/contexts/userContext';

const Header = () => {
    const router = useRouter();
    const { userId, setUserId, username, setUsername } = useUser();

    useEffect(() => {
        const storedUserId = Cookie.get("user_id");
        const storedUsername = Cookie.get("username");
        if (storedUserId && storedUsername) {
            setUserId(storedUserId);
            setUsername(storedUsername);
        }
    }, [setUserId]);

    const [isOpen, setIsOpen] = useState(false);
    const signOut = () => {
        Cookie.remove("user_id");
        Cookie.remove("username");
        setUserId(null);
        setUsername(null);
        router.push("/");
    }
    return (
        <div>
            <header className="flex w-auto h-20 items-center justify-between px-10 text-white" >
                <div className="flex items-center">
                    <img src="/assets/logo.png" alt="" className="h-12" />
                    <div className="flex flex-col justify-center h-13 ml-1 ">
                        <p className="text-base font-medium leading-none">FIBO</p>
                        <p className="text-base font-medium leading-none">CLOUD</p>
                        <p className="text-base font-medium leading-none">BLOG</p>
                    </div>
                </div>
                {userId ?
                    <div className="flex items-center gap-3 relative">
                        <button className='flex gap-2 border p-3 rounded-full'>
                            <Icon icon="tabler:pencil" className='text-[22px]'></Icon>
                            <p className='font-grotesk'>Write</p>
                        </button>
                        <button className='flex gap-2 border p-3 rounded-full'>
                            <Icon icon="tabler:bell-ringing" className='text-[22px]'></Icon>
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center gap-2 h-70 rounded-full"
                        >
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <p className='text-white font-grotesk'>Hi, {username}</p>
                        </button>
                    </div>
                    :
                    <div className="flex items-center gap-3 relative">
                        <button className='flex gap-2  p-3 rounded-md hover:bg-zinc-700'
                            onClick={() => router.push("/signup")}>
                            <p className='font-grotesk'>Sign Up</p>
                        </button>
                        <div className="w-[1px] h-10 bg-zinc-400"></div>
                        <button className='flex  gap-2  p-3 rounded-md hover:bg-zinc-700'
                            onClick={() => router.push("/login")}>
                            <p className='font-grotesk'>Login</p>
                        </button>
                    </div>
                }

            </header>
            <div className="w-full h-[1px] bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800"></div>
            {isOpen && (
                <div
                    className="absolute right-10 z-20 w-56 rounded-lg font-grotesk"
                >
                    <div className="">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                        >
                            Profile
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                        >
                            Library
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                        >
                            Stories
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                        >
                            Stats
                        </a>
                        <hr className="my-2 border-gray-200" />
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                        >
                            Settings
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-red-500"
                            onClick={() => { setIsOpen(false); signOut(); }}
                        >
                            Sign Out
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;