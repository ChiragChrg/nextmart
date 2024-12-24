"use client"

import Link from 'next/link';
// import { registerUser } from '@/app/actions/AuthActions';
import Input from '../CustomUI/Input';
import SubmitButton from '../CustomUI/SubmitButton';
import toast from 'react-hot-toast';

const RegisterForm = () => {
    // const handleRegister = async (formData: FormData) => {
    //     const username = formData.get("username") as string;
    //     const email = formData.get("email") as string;
    //     const password = formData.get("password") as string;
    //     const confirmPassword = formData.get("confirm_password") as string;

    //     if (password !== confirmPassword) {
    //         return toast.error('Password and Confirm Password do not match')
    //     }

    //     const { error } = await registerUser({ username, email, password })

    //     if (error) {
    //         return toast.error("User registration failed");
    //     }

    //     return toast.success("Check email to verify registration");
    // };

    return (
        <form className='bg-baseClr py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full'>
            <Input type='text' label='Username' name='username' placeholder='Enter your name' />
            <Input type='email' label='Email' name='email' placeholder='example@email.com' />
            <Input type='password' label='Password' name='password' placeholder='Enter Password' />
            <Input type='password' label='Confirm Password' name='confirm_password' placeholder='Confirm Password' />

            <SubmitButton text='Create Account' />

            <div className="w-full flex gap-2 justify-center">
                Already have an account?
                <Link
                    href='/login'
                    className='text-primaryClr font-bold capitalize tracking-wider'>
                    Login
                </Link>
            </div>
        </form>
    )
}

export default RegisterForm