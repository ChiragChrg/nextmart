"use client"

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { TextButton } from '@components/Buttons'
import Input from '@components/Form/Input'
import axios from 'axios'
import ShoppingSVG from '@components/SVGs/ShoppingSVG'
import DeliverySVG from '@components/SVGs/DeliverySVG'
import LogoSVG from '@components/SVGs/LogoSVG'
import LoaderIcon from '@components/LoaderIcon'
import { toast } from 'react-toastify'

const Register = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confPassword, setConfPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    const HandleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confPassword) {
            alert("Password doesn't Match")
            return
        }

        setLoading(true)
        try {
            const res = await axios.post(`/api/register`, {
                name: username,
                email: email,
                password: password,
            })

            if (res.status == 201) {
                router.push("/login")
                console.log("SignupForm", res)
                toast.success("User created successfully!")
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong!")
            setLoading(false)
        }
    }

    return (
        <section className='flex_center gap-8 px-4 sm:px-16 pt-8 w-full h-full my-auto'>
            <ShoppingSVG className='hidden sm:block px-8' />

            <div className="flex justify-around items-center flex-col gap-2 w-full sm:min-w-[448px] py-4">
                <div className='text-[1.8em] font-medium flex_center sm:gap-4 flex-col sm:flex-row'>
                    <h1>Register to</h1>
                    <LogoSVG width="200px" />
                </div>

                <form onSubmit={HandleSignUp} method='POST' className='bg-baseClr py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full'>
                    <Input type='text' label='Username' placeholder='Enter your name' setValue={setUsername} />
                    <Input type='email' label='Email' placeholder='example@email.com' setValue={setEmail} />
                    <Input type='password' label='Password' placeholder='Enter Password' isPassword setValue={setPassword} />
                    <Input type='password' label='Confirm Password' autoComplete='off' placeholder='Confirm Password' isPassword setValue={setConfPassword} />

                    {!loading ?
                        <button
                            className='bg-primaryClr p-2 rounded text-white text-bold'
                            type='submit'>
                            Sign In
                        </button>
                        :
                        <div className='flex_center bg-secondaryClr p-2 rounded'>
                            <LoaderIcon width='23px' height='23px' />
                        </div>
                    }

                    <div className="w-full flex gap-2 justify-center">
                        Already have an account?
                        <TextButton href='/login' text='Login' className='!text-primaryClr font-bold' />
                    </div>
                </form>
            </div>

            <DeliverySVG className='hidden sm:block px-8' />
        </section>
    )
}

export default Register