"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"


const UserAvatar = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { data: session } = useSession()

    return (
        <>
            {session ?
                <div className="flex_center gap-2 cursor-pointer hover:bg-secondaryClr border border-secondaryClr p-1 rounded smooth_transition">
                    <div className="bg-primaryClr flex_center rounded-full text-white relative overflow-hidden">
                        <Image src={session?.user?.image} alt="" width={40} height={40} className="z-0" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute z-[-1]" width="30px" height="30px" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>

                    <div className="flex flex-col justify-center max-w-[80px] w-full ml-1 overflow-hidden">
                        <span className="text-[0.75em] leading-[1em] text-textLiteClr">Welcome !</span>
                        <span className="text-[0.9em]">{session?.user?.name}</span>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-textLiteClr">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                :
                <Link href="/login" className="bg-primaryClr flex_center gap-2 text-white p-2 rounded cursor-pointer">
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="50"
                        fill="none"
                        viewBox="0 0 46 50"
                        className="w-5 h-5"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                            d="M30 17V7L2 2v46l28-5V33m13.5-8h-20m20 0L36 17m7.5 8L36 33"
                        ></path>
                    </svg> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="50"
                        fill="none"
                        viewBox="0 0 32 50"
                        className="w-5 h-5"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                            d="M30 17V7L2 2v46l28-5V33M18 17l-8 8m0 0l8 8m-8-8h20"
                        ></path>
                    </svg>
                    Login
                </Link>
            }
        </>
    )
}

export default UserAvatar