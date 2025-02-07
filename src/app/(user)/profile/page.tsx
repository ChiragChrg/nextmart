"use client"

import React from 'react'
import Image from 'next/image'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { LogOutIcon, User2, X } from 'lucide-react'
import { CircleSkeleton, RectSkeleton } from '@/components/CustomUI/Skeleton'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useLogout } from '@/hooks/useLogout'


type pageProps = {

}

const Profile: React.FC<pageProps> = ({ }) => {
    const { user } = useSelector((state: RootState) => state.user)
    const handleLogout = useLogout()

    return <main className='main_style mt-4 mb-8'>
        <h1 className='text-[2em] font-bold self-start'>User Profile</h1>

        <div className="flex_center flex-col gap-8 mt-10">
            <div className="relative">
                <div className="flex_center w-[150px] aspect-square rounded-full overflow-hidden">
                    <CircleSkeleton size='125px' className={!user.email ? 'block' : "hidden"} />
                    {user?.image ?
                        <Image
                            src={user?.image}
                            alt='User_Avatar'
                            width={150}
                            height={150}
                            loading='eager'
                            className={!user.email ? 'hidden' : "block object-cover"}
                        />
                        :
                        <div style={{ width: 150, height: 150 }} className={!user.email ? 'hidden' : "flex_center bg-slate-400 text-white aspect-square p-1.5 rounded-full"}>
                            <User2 className='w-full h-full p-4' />
                        </div>
                    }
                </div>
                <div className="absolute top-0 w-full h-full border-[3px] border-dashed border-primaryClr rounded-full animate-border-spin scale-[1.125]"></div>
            </div>

            <div className="w-full max-w-[300px] text-center flex_center flex-col  gap-2">
                {!user.email ? <RectSkeleton /> : <h2 className='font-bold text-[1.4em]'>{user?.name}</h2>}
                {!user.email ? <RectSkeleton /> : <span className="opacity-80">{user?.email}</span>}
            </div>
        </div>

        <div className="flex flex-col gap-2 max-w-[600px] mx-auto mt-6">
            <div className="w-full flex border-2 p-2 rounded">
                <div className="border-r border-border/80 pl-1 w-fit min-w-[140px] sm:min-w-[200px]">Username</div>
                <div className="w-full min-w-[260px] px-8 overflow-hidden overflow-ellipsis">{user?.name}</div>
            </div>
            <div className="w-full flex border-2 p-2 rounded">
                <div className="border-r border-border/80 px-1 w-fit min-w-[140px] sm:min-w-[200px] ">Email</div>
                <div className="w-full min-w-[260px] px-8 overflow-hidden overflow-ellipsis">{user?.email}</div>
            </div>

            <div className="flex flex-col gap-2 w-full mt-4">
                <span className='font-bold'>Address</span>
                <div className="w-full flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 px-1 w-fit min-w-[140px] sm:min-w-[200px]">State</div>
                    <div className="w-full min-w-[260px] px-8 overflow-hidden overflow-ellipsis">{user?.address?.state ?? "N/A"}</div>
                </div>
                <div className="w-full flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 px-1 w-fit min-w-[140px] sm:min-w-[200px] ">City</div>
                    <div className="w-full min-w-[260px] px-8 overflow-hidden overflow-ellipsis">{user?.address?.city ?? "N/A"}</div>
                </div>
                <div className="w-full flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 px-1 w-fit min-w-[140px] sm:min-w-[200px]">Street</div>
                    <div className="w-full min-w-[260px] px-8 overflow-hidden overflow-ellipsis">{user?.address?.street ?? "N/A"}</div>
                </div>
                <div className="w-full flex border-2 p-2 rounded">
                    <div className="border-r border-border/80 px-1 w-fit min-w-[140px] sm:min-w-[200px] ">Pincode</div>
                    <div className="w-full min-w-[260px] px-8 overflow-hidden overflow-ellipsis">{user?.address?.zip ?? "N/A"}</div>
                </div>
            </div>

            <div className="flex justify-center my-8 gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className='flex_center gap-2 w-full sm:max-w-[300px]'>
                            <LogOutIcon />
                            <span>Logout</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Logout?</DialogTitle>
                            <DialogDescription>
                                Do your really want to logout?
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex justify-between items-end gap-8 mt-8">
                            <DialogClose asChild>
                                <Button variant="secondary" className='flex_center gap-2 w-full bg-secondaryClr'>
                                    <X size={20} />
                                    <span>Cancel</span>
                                </Button>
                            </DialogClose>

                            <Button variant="destructive" onClick={handleLogout} className='flex_center gap-2 w-full text-white'>
                                <LogOutIcon size={20} />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </main>
}

export default Profile