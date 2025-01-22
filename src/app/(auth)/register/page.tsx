import { Metadata } from "next";
import React from 'react'
import RegisterForm from "@/components/Forms/RegisterForm";
import { DeliverySVG, ShoppingSVG, TextLogoSVG } from "@/assets/SVGs";
import OAuthButtons from "@/components/CustomUI/OAuthButtons";

export const metadata: Metadata = {
    title: 'Register | NextMart',
    description: "Join the Next Mart family! Register now for an exceptional shopping experience. Access a vast array of products, from fashion to electronics. Enjoy personalized recommendations and exclusive deals. Sign up securely and embark on a journey of endless shopping possibilities!",
}

const Register = () => {

    return (
        <section className='section_style grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-16 w-full h-full my-auto'>
            <ShoppingSVG className='hidden sm:block px-8' />

            <div className="flex justify-around items-center flex-col gap-2 w-full py-4 my-auto">
                <div className='text-[1.8em] font-medium flex_center sm:gap-4 flex-col sm:flex-row'>
                    <h1>Register to</h1>
                    <TextLogoSVG width="200px" />
                </div>

                <RegisterForm />

                <div className=" w-full sm:max-w-md sm:px-4 flex_center gap-2 text-primaryClr font-medium">
                    <span className='flex w-[15em] h-[2px] bg-secondaryDarkClr'></span>
                    <span>OR</span>
                    <span className='flex w-[15em] h-[2px] bg-secondaryDarkClr'></span>
                </div>

                <OAuthButtons />
            </div>

            <DeliverySVG className='hidden sm:block px-8 max-w-[400px] pt-10' />
        </section>
    )
}

export default Register