"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import LoaderIcon from "./CustomUI/LoaderIcon"
import { signOut, useSession } from "next-auth/react"
import { ChevronDownIcon, HelpCircleIcon, LogOutIcon, User2Icon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useDispatch, useSelector } from "react-redux"
import { userActions } from "@/store/userSlice"
import { RootState } from "@/store"
import { useRouter } from "next/navigation"

const UserAvatar = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { data: session, status } = useSession()
    const router = useRouter()

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (session?.user && status === "authenticated")
            dispatch(userActions.setUser(session?.user))
        else
            dispatch(userActions.clearUser())

        setLoading(false)
    }, [session, status, dispatch])

    const HandleLogout = async () => {
        try {
            setLoading(true)
            await signOut();

            dispatch(userActions.clearUser())
        } catch (error) {
            console.log(error)
        }
    }

    if (session?.user) {
        return (
            <>
                <div className="hidden lg:flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex justify-between items-center w-[200px] bg-secondary px-2 py-1 rounded outline-border">
                            {session?.user?.image ?
                                <div className="flex_center rounded-full relative overflow-hidden">
                                    <Image src={session?.user?.image} alt="ProfileImage" width={35} height={35} />
                                </div>
                                :
                                <div className="bg-primaryClr aspect-square text-white p-1 rounded-full w-[35px] h-[35px]">
                                    <User2Icon className="w-full" />
                                </div>
                            }
                            <div className="flex_center flex-col">
                                <span className="text-[0.8em]">Hi {session?.user?.name}</span>
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
                            <DropdownMenuItem role="button" onClick={HandleLogout} className="flex_center bg-red-600 focus:bg-red-600/90 text-white focus:text-white rounded cursor-pointer">
                                <LogOutIcon className="mr-2 w-4 h-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile User Avatar */}
                <Link href="/profile" className="lg:hidden">
                    {session?.user?.picture ?
                        <div className="flex_center rounded-full relative overflow-hidden" >
                            <Image src={session?.user?.image} alt="ProfileImage" width={40} height={40} />
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
                    <Link href="/login" className="bg-primaryClr flex_center gap-2 text-white px-4 py-[0.5em] rounded cursor-pointer">
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