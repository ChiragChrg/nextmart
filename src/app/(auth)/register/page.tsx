import { Metadata } from "next";
import React from 'react'
import RegisterForm from "@/components/Forms/RegisterForm";
import { DeliverySVG, ShoppingSVG, TextLogoSVG } from "@/assets/SVGs";

export const metadata: Metadata = {
    title: 'Register | NextMart',
    description: "Join the Next Mart family! Register now for an exceptional shopping experience. Access a vast array of products, from fashion to electronics. Enjoy personalized recommendations and exclusive deals. Sign up securely and embark on a journey of endless shopping possibilities!",
}

const page = () => {

    return (
        <section className='section_style grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-16 w-full h-full my-auto'>
            <ShoppingSVG className='hidden sm:block px-8' />

            <div className="flex justify-around items-center flex-col gap-2 w-full py-4 my-auto">
                <div className='text-[1.4em] font-medium flex_center sm:gap-4 flex-col'>
                    <h1>Register to</h1>
                    <TextLogoSVG width="200px" />
                </div>

                <RegisterForm />
            </div>

            <DeliverySVG className='hidden sm:block px-8 max-w-[400px] pt-10' />
        </section>
    )
}

export default page