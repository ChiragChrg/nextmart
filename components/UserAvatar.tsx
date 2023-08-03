"use client"
import { useEffect, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react"

import { LogIn, LogOut } from "@redux/features/userSlice"
import { useAppDispatch } from "@redux/features/hooks"
import { useAppSelector } from "@redux/features/hooks"
import { usePathname, useRouter } from "next/navigation"
import UserSVG from "./SVGs/UserSVG"
import Link from "next/link"
import Image from "next/image"
import LoaderIcon from "./LoaderIcon"

const UserAvatar = () => {
    const { data: session, status } = useSession()

    const [showDropMenu, setShowDropMenu] = useState<boolean>(false)
    const [loading, setLoading] = useState<string>("loading")
    const DropdownRef = useRef<HTMLDivElement>(null)

    const user = useAppSelector((state) => state?.account?.account?.user)
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const handleDropdownBlur = (event: MouseEvent) => {
            if (DropdownRef.current && !DropdownRef.current.contains(event?.target as Node)) {
                setShowDropMenu(false);
            }
        }
        //Hide Dropdown when user clicks anything other than Dropdown
        document.addEventListener("click", handleDropdownBlur)
        return () => document.removeEventListener("click", handleDropdownBlur)
    }, [showDropMenu])

    useEffect(() => {
        console.log("SessionChanged", session, status)
        if (session) {
            dispatch(LogIn(session))
            console.log("Dispatched", session)
        }
        setLoading(status)
    }, [session, status])

    const HandleLogout = async () => {
        try {
            await signOut({
                callbackUrl: '/',
                redirect: false
            })
            // localStorage.removeItem("nextmart-user")
            dispatch(LogOut())

            if (pathname !== "/") router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    if (user && loading === "authenticated") {
        return (
            <>
                {/* Desktop User Avatar */}
                <div
                    onClick={() => setShowDropMenu(prev => !prev)}
                    className="hidden lg:flex justify-center items-center relative w-fit gap-2 cursor-pointer hover:bg-secondaryClr border border-secondaryClr p-1 px-2 rounded smooth_transition" >
                    {user?.image ?
                        <div className="flex_center rounded-full relative overflow-hidden">
                            < Image src={user?.image} alt="ProfileImage" width={35} height={35} />
                        </div >
                        :
                        <div className="bg-primaryClr aspect-square text-white p-1 rounded-full">
                            <UserSVG width="27px" height="27px" />
                        </div>
                    }

                    <div className="flex flex-col justify-center max-w-fit w-full ml-1 overflow-hidden">
                        <span className="text-[0.75em] leading-[1em] text-textLiteClr">Welcome !</span>
                        <span className="text-[0.9em]">{user?.name?.split(" ")[0]}</span>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-textLiteClr">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>

                    {/* Profile Menu Dropdown */}
                    {showDropMenu && <div
                        ref={DropdownRef}
                        className="hidden lg:flex flex-col gap-2 bg-baseClr p-2 rounded-md absolute top-14 right-0 !w-[200px] z-20 border border-secondaryClr">

                        <Link href="/profile"
                            className="flex_center gap-2 bg-primaryClr text-white p-2 rounded">
                            My Profile
                        </Link>

                        <button
                            onClick={HandleLogout}
                            className="flex_center gap-2 bg-red-600 text-white p-2 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="50"
                                fill="none"
                                className="w-6 h-6"
                                viewBox="0 0 32 50"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                    d="M30 17V7L2 2v46l28-5V33m0-8H10m20 0l-10-8m10 8l-10 8"
                                ></path>
                            </svg>

                            <span>Logout</span>
                        </button>
                    </div>}
                </div >

                {/* Mobile User Avatar */}
                <Link href="/profile" className="lg:hidden">
                    {user?.image ?
                        <div className="flex_center rounded-full relative overflow-hidden" >
                            <Image src={user?.image} alt="ProfileImage" width={40} height={40} />
                        </div>
                        :
                        <div className="bg-primaryClr aspect-square text-white p-1 rounded-full" >
                            <UserSVG width="30px" height="30px" />
                        </div>
                    }
                </Link>
            </>
        )
    }
    else {
        return (
            <>
                {loading !== "loading" ?
                    <Link href="/login" onClick={() => setLoading("loading")} className="bg-primaryClr flex_center gap-2 text-white px-2 py-[0.3em] rounded cursor-pointer">
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

                        <span>Login</span>
                    </Link>
                    :
                    <div className="relative bg-secondaryClr flex_center gap-2 text-white px-2 py-[0.3em] min-w-[5.5em] rounded">
                        <LoaderIcon width="24px" height="24px" />
                    </div>
                }
            </>
        )
    }
}

export default UserAvatar