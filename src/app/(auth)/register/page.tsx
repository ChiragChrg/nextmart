import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from 'next/headers';
import { redirect } from "next/navigation";
import React from 'react'
import { DeliverySVG, ShoppingSVG, TextLogoSVG } from "@/assets/SVGs";
import Input from "@/components/CustomUI/Input";
import SubmitButton from "@/components/CustomUI/SubmitButton";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Register | NextMart',
    description: "Join the Next Mart family! Register now for an exceptional shopping experience. Access a vast array of products, from fashion to electronics. Enjoy personalized recommendations and exclusive deals. Sign up securely and embark on a journey of endless shopping possibilities!",
}

const page = () => {
    const register = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    return (
        <section className='section_style flex justify-center items-end gap-8 px-4 sm:px-16 w-full h-full my-auto'>
            <ShoppingSVG className='hidden sm:block px-8 max-w-[500px]' />

            <div className="flex justify-around items-center flex-col gap-2 w-full sm:w-1/2 py-4 my-auto">
                <div className='text-[1.4em] font-medium flex_center sm:gap-4 flex-col'>
                    <h1>Register to</h1>
                    <TextLogoSVG width="200px" />
                </div>

                <form action={register} className='bg-baseClr py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full sm:max-w-md'>
                    <Input type='text' label='Username' name='username' placeholder='Enter your name' />
                    <Input type='email' label='Email' name='email' placeholder='example@email.com' />
                    <Input type='password' label='Password' name='password' placeholder='Enter Password' isPassword />
                    <Input type='password' label='Confirm Password' name='confirm_password' autoComplete='off' placeholder='Confirm Password' isPassword />

                    <SubmitButton />

                    <div className="w-full flex gap-2 justify-center">
                        Already have an account?
                        <Link
                            href='/login'
                            className='text-primaryClr font-bold capitalize tracking-wider'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>

            <DeliverySVG className='hidden sm:block px-8 max-w-[500px]' />
        </section>
    )
}

export default page