"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import LoaderIcon from "./CustomUI/LoaderIcon"
import { signOut, useSession } from "next-auth/react"
import { ChevronDownIcon, HelpCircleIcon, LogInIcon, LogOutIcon, User2Icon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useDispatch, useSelector } from "react-redux"
import { userActions } from "@/store/userSlice"
import { RootState } from "@/store"
import { usePathname, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getUserByEmail } from "@/app/actions/AuthActions"

const UserAvatar = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()

    const { user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const { data: fetchData, status: userFetchStatus } = useQuery({
        queryKey: ["fetch-user"],
        queryFn: async () => {
            try {
                const res = await getUserByEmail(session?.user?.email);
                // console.log("Fetch_Res", res)
                return res
            } catch (error) {
                console.error('Error fetching User:', error);
                throw new Error('Failed to fetch User data');
            }
        },
        enabled: !!session?.user?.email,
    })

    useEffect(() => {
        if (userFetchStatus === "success" && status === "authenticated") {
            dispatch(userActions.setUser(fetchData))
        }

        setLoading(false)
    }, [fetchData, userFetchStatus, session, status, dispatch])

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
                        <LogInIcon size={22} />
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