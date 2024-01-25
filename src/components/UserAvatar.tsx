"use client"
import { useEffect, useRef, useState } from "react"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import LoaderIcon from "./CustomUI/LoaderIcon"
import { createClient } from "@/utils/supabase/client"
import useUserStore from "@/store/useUserStore"
import { LogoSVG } from "@/assets"
import { User2Icon } from "lucide-react"

const UserAvatar = () => {
    const supabase = createClient()
    const { setUser } = useUserStore()

    const [showDropMenu, setShowDropMenu] = useState<boolean>(false)
    const [loading, setLoading] = useState<string>("loading")
    const DropdownRef = useRef<HTMLDivElement>(null)

    const pathname = usePathname()
    const router = useRouter()


    useEffect(() => {
        const GetSession = async () => {
            const { data } = await supabase.auth.getSession()
            const userSession = {
                uid: data?.session?.user?.id as string,
                username: data?.session?.user?.user_metadata?.full_name as string,
                email: data?.session?.user?.email as string,
                avatarImg: data?.session?.user?.user_metadata?.avatar_url as string,
                isAuthenticated: data?.session?.user?.aud ? true : false,
            }

            setUser(userSession)
            console.log("ClientUser", data)
        }
        // GetSession()
    }, [])

    const HandleLogout = async () => {
        try {


            if (pathname !== "/") router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    if (loading === "authenticated") {
        return (
            <>
                {/* Desktop User Avatar */}
                <div className="hidden lg:flex justify-center items-center relative w-fit gap-2 cursor-pointer hover:bg-secondaryClr border border-secondaryClr p-1 px-2 rounded smooth_transition" >
                    {true ?
                        <div className="flex_center rounded-full relative overflow-hidden">
                            <Image src={LogoSVG} alt="ProfileImage" width={35} height={35} />
                        </div >
                        :
                        <div className="bg-primaryClr aspect-square text-white p-1 rounded-full">
                            <User2Icon size={35} />
                        </div>
                    }

                    <div className="flex flex-col justify-center max-w-fit w-full ml-1 overflow-hidden">
                        <span className="text-[0.75em] leading-[1em] text-textLiteClr">Welcome !</span>
                        <span className="text-[0.9em]">TempUser</span>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-textLiteClr">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div >

                {/* Mobile User Avatar */}
                <Link href="/profile" className="lg:hidden">
                    {true ?
                        <div className="flex_center rounded-full relative overflow-hidden" >
                            <Image src={LogoSVG} alt="ProfileImage" width={40} height={40} />
                        </div>
                        :
                        <div className="bg-primaryClr aspect-square text-white p-1 rounded-full" >
                            <User2Icon size={35} />
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
                    <div className="relative bg-border flex_center gap-2 text-white px-2 py-[0.3em] min-w-[5.5em] rounded">
                        <LoaderIcon width="24px" height="24px" />
                    </div>
                }
            </>
        )
    }
}

export default UserAvatar