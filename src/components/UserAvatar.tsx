"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import LoaderIcon from "./CustomUI/LoaderIcon"
import { ChevronDownIcon, HelpCircleIcon, LogOutIcon, User2Icon } from "lucide-react"
// import toast from "react-hot-toast"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserAvatar = () => {
    const [loading, setLoading] = useState<boolean>(true)
    let user: any
    // const supabase = createClient()
    const pathname = usePathname()
    const router = useRouter()

    // useEffect(() => {
    //     const GetSession = async () => {
    //         const { data, error } = await supabase.auth.getSession()

    //         if (error || data?.session === null) {
    //             setLoading(false)
    //             return toast.error(error?.message || "User session expired!")
    //         }

    //         const userSession = {
    //             uid: data?.session?.user?.id as string,
    //             username: data?.session?.user?.user_metadata?.username as string,
    //             email: data?.session?.user?.email as string,
    //             avatarImg: data?.session?.user?.user_metadata?.avatar_url as string,
    //             isAuthenticated: data?.session?.user?.aud ? true : false,
    //         }

    //         setUser(userSession)
    //         setLoading(false)
    //         // console.log("ClientUser", data)
    //     }
    //     GetSession()
    // }, [setUser, supabase.auth])

    const HandleLogout = async () => {
        try {
            setLoading(true)

            if (pathname !== "/") router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    if (user) {
        return (
            <>
                <div className="hidden lg:flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex justify-between items-center w-[200px] bg-secondary px-2 py-1 rounded outline-border">
                            {user?.avatarImg ?
                                <div className="flex_center rounded-full relative overflow-hidden">
                                    <Image src={user?.avatarImg} alt="ProfileImage" width={35} height={35} />
                                </div>
                                :
                                <div className="bg-primaryClr aspect-square text-white p-1 rounded-full w-[35px] h-[35px]">
                                    <User2Icon className="w-full" />
                                </div>
                            }
                            <div className="flex_center flex-col">
                                <span className="text-[0.8em]">Hi {user?.username}</span>
                                <span className="text-[0.9em] font-medium">Your Account</span>
                            </div>
                            <ChevronDownIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]">
                            <DropdownMenuItem>
                                <User2Icon className="mr-2 w-4 h-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>
                                <HelpCircleIcon className="mr-2 w-4 h-4" />
                                <span>Customer Service</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex_center bg-red-600 focus:bg-red-600/90 text-white focus:text-white rounded">
                                <LogOutIcon className="mr-2 w-4 h-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile User Avatar */}
                <Link href="/profile" className="lg:hidden">
                    {user?.avatarImg ?
                        <div className="flex_center rounded-full relative overflow-hidden" >
                            <Image src={user?.avatarImg} alt="ProfileImage" width={40} height={40} />
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
                {!loading ?
                    <Link href="/login" className="bg-primaryClr flex_center gap-2 text-white px-2 py-[0.3em] rounded cursor-pointer">
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