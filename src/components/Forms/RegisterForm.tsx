"use client"

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { registerUser } from '@/app/actions/AuthActions';
import Input from '../CustomUI/Input';
import SubmitButton from '../CustomUI/SubmitButton';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

const RegisterForm = () => {
    const [state, action, isPending] = useActionState(registerUser, null)

    useEffect(() => {
        if (state?.status === 201) {
            toast.success(state?.message);
            redirect("/login")
        } else if (state?.status) {
            toast.error(state?.message);
        }
    }, [state]);

    return (
        <form action={action} className='bg-background py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full sm:max-w-md'>
            <Input type='text' label='Username' name='username' placeholder='Enter your name' defaultValue={state?.formFields?.username} />
            <Input type='email' label='Email' name='email' placeholder='example@email.com' defaultValue={state?.formFields?.email} />
            <Input type='password' label='Password' name='password' placeholder='Enter Password' defaultValue={state?.formFields?.password} />
            <Input type='password' label='Confirm Password' name='confirm_password' placeholder='Confirm Password' defaultValue={state?.formFields?.confirmPassword} />

            <SubmitButton text='Create Account' pending={isPending} />

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