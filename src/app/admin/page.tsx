"use client"
import React, { useActionState, useEffect } from 'react'
import AdminHeader from './components/AdminHeader'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Input from '@/components/CustomUI/Input'
import SubmitButton from '@/components/CustomUI/SubmitButton'
import { adminLogin } from '../actions/AdminActions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { User2Icon } from 'lucide-react'

const AdminLanding = () => {
    const { data: session } = useSession()
    const [state, action, isPending] = useActionState(adminLogin, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state?.status === 200) {
            toast.success(state?.message);
            router.push("/admin/dashboard")
        } else if (state?.status) {
            toast.error(state?.message);
        }
    }, [state, router]);

    return (
        <section className='h-screen'>
            <AdminHeader />

            <div className="flex_center flex-col gap-4 h-3/4">
                <h1 className='text-[1.5em]'>Welcome Admin</h1>
                {session?.user?.image ?
                    <Image
                        src={session?.user?.image}
                        alt="ProfileImage"
                        width={100}
                        height={100}
                        className='rounded-full' />
                    :
                    <div className="flex_center bg-primaryClr aspect-square text-white p-1 rounded-full w-[100px] h-[100px]">
                        <User2Icon className="w-full h-full p-4" />
                    </div>
                }
                <span className='text-[1.8em]'>{session?.user?.name}</span>

                <form action={action} className='flex_center flex-col gap-4 w-full max-w-[300px] mt-4'>
                    <Input
                        label='Email'
                        type='email'
                        name='email'
                        defaultValue={session?.user?.email}
                        required={true}
                        disabled={true}
                        className="border-primaryClr w-full"
                    />

                    <Input
                        label='Enter Password'
                        type='password'
                        placeholder='Enter Admin Password'
                        name='password'
                        required={true}
                        className="border-primaryClr w-full"
                    />

                    <SubmitButton text='Login as Admin' pending={isPending} className='w-full' />
                </form>
            </div>
        </section>
    )
}

export default AdminLanding