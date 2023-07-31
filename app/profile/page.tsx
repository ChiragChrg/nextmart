"use client"
import { useAppSelector } from "@redux/features/hooks"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { useAppDispatch } from "@redux/features/hooks"
import { LogOut } from "@redux/features/userSlice"
import Image from "next/image"
import UserSVG from "@components/SVGs/UserSVG"

const Profile = () => {
    const user = useAppSelector((state) => state.account?.account?.user)
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useAppDispatch()

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

    return (
        <section className="px-4">
            <h1 className="font-josefin text-[2em]">My Profile</h1>

            <div className="w-fit mx-auto aspect-square rounded-full overflow-hidden p-1 border-[4px] border-primaryClr border-dashed">
                {user?.image ?
                    <Image src={user?.image as string}
                        alt="UserImage"
                        width={120}
                        height={120}
                        className="rounded-full"
                    />
                    :
                    <div className="bg-secondaryDarkClr aspect-square text-white p-4 rounded-full">
                        <UserSVG width="94px" height="94px" />
                    </div>
                }
            </div>

            <div className="w-full flex_center flex-col pt-4">
                <h2 className="text-[1.5em] font-josefin font-bold">{user?.name}</h2>
                <h3>{user?.email}</h3>
            </div>

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
        </section>
    )
}

export default Profile