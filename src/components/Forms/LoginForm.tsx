"use client"

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { loginUser } from '@/app/actions/AuthActions';
import Input from '../CustomUI/Input';
import SubmitButton from '../CustomUI/SubmitButton';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const handleLogin = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error } = await loginUser({ email, password })

        if (error) {
            return toast.error("Invalid User Credentials");
        }

        redirect("/")
    };

    return (
        <form action={handleLogin} className='bg-baseClr py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full sm:max-w-md'>
            <Input type='email' name="email" label='Email' placeholder='example@email.com' />

            <div className="flex flex-col gap-2">
                <Input type='password' name="password" label='Password' placeholder='Enter Password' isPassword />
                <div className="text-primaryClr text-[0.9em] sm:text-[0.8em] w-full flex justify-end">Forgot Password?</div>
            </div>

            <SubmitButton />

            <div className="w-full flex gap-2 justify-center">
                New to NextMart?
                <Link
                    href='/register'
                    className='text-primaryClr font-bold capitalize tracking-wider'>
                    Register
                </Link>
            </div>
        </form>
    )
}

export default LoginForm