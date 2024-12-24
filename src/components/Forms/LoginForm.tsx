"use client"

import Link from 'next/link';
import { loginWithCreds } from '@/app/actions/AuthActions';
import { redirect } from 'next/navigation';
import Input from '../CustomUI/Input';
import SubmitButton from '../CustomUI/SubmitButton';
import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password) return toast.error("Invalid Credentials")

        const { error } = await loginWithCreds({ email, password })
        if (error) {
            return toast.error(error);
        }

        toast.success("Logged in Successfully!")
        redirect("/")
    };

    return (
        <form onSubmit={handleLogin} className='bg-baseClr py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full sm:max-w-md'>
            <Input
                type='email'
                name="email"
                label='Email'
                placeholder='example@email.com'
                setValue={setEmail} />

            <div className="flex flex-col gap-2">
                <Input
                    type='password'
                    name="password"
                    label='Password'
                    placeholder='Enter Password'
                    setValue={setPassword} />
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