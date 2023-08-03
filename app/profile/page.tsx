"use client"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

import { signOut, useSession } from "next-auth/react"
import { useAppSelector } from "@redux/features/hooks"
import { useAppDispatch } from "@redux/features/hooks"
import { LogOut } from "@redux/features/userSlice"

import axios from "axios"
import { toast } from "react-toastify"
import RectSkeleton from "@components/Skeletons/RectSkeleton"
import UserSVG from "@components/SVGs/UserSVG"

const Profile = () => {
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [phoneValue, setPhoneValue] = useState<string | null>("")
    const [dobValue, setDobValue] = useState<Date | null>(null)

    const user = useAppSelector((state) => state?.account?.account?.user)
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const { update } = useSession()

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

    const HandleUserUpdate = async () => {
        // const newUser: Session = {
        //     user: {
        //         ...user,
        //         phone: phoneValue as string,
        //         dob: dobValue as Date
        //     }
        // }
        // update(newUser.user)
        // dispatch(LogIn(newUser))

        if (user?.phone === phoneValue && user?.dob === dobValue) return

        const updateId = toast.loading("Updating User details")
        try {
            const res = await axios.post("/api/updateuser", {
                email: user?.email,
                phone: phoneValue,
                dob: dobValue !== null ? new Date(dobValue) : null,
            })
            console.log("UpdateUser", res)
            if (res.status === 201) {
                setIsEditable(false)
                update({
                    phone: phoneValue,
                    dob: dobValue
                })

                toast.update(updateId, {
                    render: "User updated successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000
                })
            }
        } catch (err) {
            console.log(err)
            setIsEditable(false)
            toast.update(updateId, {
                render: "Something went wrong!",
                type: "error",
                isLoading: false,
                autoClose: 4000
            })
        }

    }

    return (
        <section className="px-4 flex flex-col md:flex-row justify-evenly gap-4">
            <div className="md:w-1/2 tablet:w-1/3">
                <h1 className="font-ubuntu text-[2em] mb-2">My Profile</h1>

                <div className="w-fit mx-auto aspect-square rounded-full overflow-hidden p-1 border-[4px] border-primaryClr border-dashed relative">
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

                <div className="w-full flex_center flex-col py-2">
                    {user ?
                        <>
                            <h2 className="text-[1.5em] font-ubuntu font-bold">{user?.name}</h2>
                            <h3>{user?.email}</h3>
                        </>
                        :
                        <>
                            <RectSkeleton width="200px" height="32px" className="mb-1" />
                            <RectSkeleton width="300px" height="24px" />
                        </>
                    }
                </div>

                <div className="flex flex-col gap-2 py-2 pt-4">
                    <div className="flex justify-between">
                        <h2 className="font-ubuntu text-[1.4em]">User Details</h2>

                        {!isEditable ?
                            <div onClick={() => setIsEditable(true)}
                                className="flex_center gap-2 bg-primaryClr text-baseClr px-2 py-1 rounded cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                <span>Edit</span>
                            </div>
                            :
                            <div onClick={HandleUserUpdate}
                                className="flex_center gap-2 bg-primaryClr text-baseClr px-2 py-1 rounded cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>Save</span>
                            </div>
                        }
                    </div>
                    {user ?
                        <>
                            <InfoBar label="Name" value={user?.name as string} />
                            <InfoBar label="Email" value={user?.email as string} />
                            <InfoBar label="Phone" value={user?.phone as string}
                                editable={isEditable}
                                setPhoneValue={setPhoneValue}
                                placeholder="Enter Phone Number" />
                            <InfoBar label="Birthday" value={user?.dob as Date}
                                editable={isEditable}
                                isDate={true}
                                setDobValue={setDobValue}
                                placeholder="Enter your Birthday" />
                        </>
                        :
                        <>
                            <RectSkeleton width="100%" height="34px" />
                            <RectSkeleton width="100%" height="34px" />
                            <RectSkeleton width="100%" height="34px" />
                            <RectSkeleton width="100%" height="34px" />
                        </>
                    }
                </div>

                <button
                    onClick={HandleLogout}
                    className="hidden md:flex justify-center items-center gap-2 bg-baseClr text-red-600 border border-red-600 hover:text-white hover:bg-red-600 px-2 py-1.5 rounded w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="50"
                        fill="none"
                        className="w-5 h-5"
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
            </div>

            <div className="w-full md:w-1/2 pb-8">
                <h3 className="font-ubuntu text-[1.4em]">Delivery Address</h3>
                <div className="w-full h-[100px] rounded p-1 border border-secondaryClr">
                    NO ADDRESS Found
                </div>

                <button
                    onClick={HandleLogout}
                    className="flex_center md:hidden gap-2 mt-4 bg-red-600 md:bg-baseClr text-white md:text-red-600 border border-red-600 hover:text-white hover:bg-red-600 px-2 py-1.5 rounded w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="50"
                        fill="none"
                        className="w-5 h-5"
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
            </div>
        </section>
    )
}

// Custom User details component
type InfoBarType = {
    label: string,
    value: string | Date,
    placeholder?: string,
    isDate?: boolean
    editable?: boolean
    setPhoneValue?: Dispatch<SetStateAction<string | null>>
    setDobValue?: Dispatch<SetStateAction<Date | null>>
}

const InfoBar = ({ label, value, placeholder, isDate = false, editable = false, setPhoneValue, setDobValue }: InfoBarType) => {
    const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDate) {
            const newDate = e?.currentTarget?.value;
            setDobValue && setDobValue(newDate ? new Date(newDate) : null)
        }
        else
            setPhoneValue && setPhoneValue(e?.currentTarget?.value)
    }

    let dateValue

    if (isDate) {
        const isoDateString = value;
        const dateObject = new Date(isoDateString);
        dateValue = dateObject.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    return (
        <div className="grid grid-cols-3 border border-secondaryClr px-2 py-1 rounded overflow-hidden">
            <span className="pr-4 border-r border-secondaryClr">{label}</span>

            {editable ?
                <input
                    type={isDate ? "date" : "text"}
                    className="w-full col-span-2 pl-4 outline-none"
                    defaultValue={value ? value as any : ""}
                    onChange={(e) => handleEdit(e)}
                    placeholder={!value ? placeholder : ""} />
                :
                <span className="pl-4 col-span-2">{isDate ? dateValue : value as any}</span>
            }
        </div>
    )
}

export default Profile
export { InfoBar };