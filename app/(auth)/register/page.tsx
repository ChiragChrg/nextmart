"use client"

import { useState, useEffect, useRef, FormEventHandler, FormEvent } from 'react'
import { signIn, getProviders, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import ShoppingSVG from '@components/SVGs/ShoppingSVG'
import { TextButton } from '@components/Buttons'
import Input from '@components/Form/Input'
import axios from 'axios'

const Register = () => {
    const [provider, setProvider] = useState<any | null>({})
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confPassword, setConfPassword] = useState<string>("")

    // const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        const FetchProviders = async () => {
            const response = await getProviders()
            setProvider(response)
        }
        FetchProviders()
    }, [])

    // useEffect(() => {
    // if (status === "authenticated") {
    //     router.push("/")
    // }
    // }, [status])

    const HandleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confPassword) {
            alert("Password doesn't Match")
            return
        }

        // const res = await fetch(`/api/register`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         name: username,
        //         email: email,
        //         password: password,
        //     })
        // })

        const res = await axios.post(`/api/register`, {
            name: username,
            email: email,
            password: password,
        })

        if (res.status == 201) {
            router.push("/login")
        }

        console.log("SignupForm", res)

        // console.log({ email: username, password: password })
    }

    return (
        <section className='flex px-4 sm:px-16 py-12 w-full h-full'>
            <div className="flex justify-around items-center flex-col gap-2 sm:bg-secondaryClr w-full sm:w-1/2 sm:px-8 py-2 sm:mx-8 rounded-xl">
                <h1 className='text-[1.8em] font-medium'>
                    SignUp to
                    <span className='text-primaryClr font-bold ml-2'>Next Mart</span>
                </h1>

                <form onSubmit={HandleSignUp} className='bg-baseClr py-4 sm:p-4 sm:pt-8 rounded-lg flex flex-col gap-8 sm:gap-4 w-full'>
                    <Input type='text' label='Username' placeholder='Enter your name' setValue={setUsername} />
                    <Input type='email' label='Email' placeholder='example@email.com' setValue={setEmail} />
                    <Input type='password' label='Password' placeholder='Enter Password' isPassword setValue={setPassword} />
                    <Input type='password' label='Confirm Password' placeholder='Confirm Password' isPassword setValue={setConfPassword} />

                    <button
                        className='bg-primaryClr p-2 rounded text-white text-bold'
                        type='submit'>
                        Sign In
                    </button>

                    <div className="w-full flex gap-2 justify-center">
                        Already have an account?
                        <TextButton href='/login' text='Login' className='!text-primaryClr font-bold' />
                    </div>
                </form>

                <div className=" w-full flex_center gap-2 text-primaryClr font-medium">
                    <span className='flex w-[15em] h-[2px] bg-secondaryDarkClr'></span>
                    <span>OR</span>
                    <span className='flex w-[15em] h-[2px] bg-secondaryDarkClr'></span>
                </div>

                <div className="flex_center flex-col gap-4 w-full ">
                    {/* Google Login Button */}
                    <button
                        className='bg-baseClr text-textClr w-full flex_center gap-4 p-2 rounded border border-secondaryClr sm:border-none'
                        onClick={() => signIn(provider["google"]?.id, {
                            redirect: true,
                            callbackUrl: "/"
                        })}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid"
                            viewBox="-3 0 262 262"
                            className='w-9 h-9'
                        >
                            <path
                                fill="#4285F4"
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            ></path>
                            <path
                                fill="#34A853"
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            ></path>
                            <path
                                fill="#FBBC05"
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            ></path>
                            <path
                                fill="#EB4335"
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            ></path>
                        </svg>
                        <span className='text-[1.2em] font-medium'>Continue with Google</span>
                    </button>

                    {/* GitHUb Login Button */}
                    <button
                        className='bg-baseClr text-textClr w-full flex_center gap-4 p-2 rounded border border-secondaryClr sm:border-none'
                        onClick={() => signIn(provider["github"]?.id, {
                            redirect: true,
                            callbackUrl: "/"
                        })}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className='w-9 h-9'>
                            <path
                                fill="currentColor"
                                d="M94 7399c5.523 0 10 4.59 10 10.253 0 4.529-2.862 8.371-6.833 9.728-.507.101-.687-.219-.687-.492 0-.338.012-1.442.012-2.814 0-.956-.32-1.58-.679-1.898 2.227-.254 4.567-1.121 4.567-5.059 0-1.12-.388-2.034-1.03-2.752.104-.259.447-1.302-.098-2.714 0 0-.838-.275-2.747 1.051a9.396 9.396 0 00-2.505-.345 9.375 9.375 0 00-2.503.345c-1.911-1.326-2.751-1.051-2.751-1.051-.543 1.412-.2 2.455-.097 2.714-.639.718-1.03 1.632-1.03 2.752 0 3.928 2.335 4.808 4.556 5.067-.286.256-.545.708-.635 1.371-.57.262-2.018.715-2.91-.852 0 0-.529-.985-1.533-1.057 0 0-.975-.013-.068.623 0 0 .655.315 1.11 1.5 0 0 .587 1.83 3.369 1.21.005.857.014 1.665.014 1.909 0 .271-.184.588-.683.493-3.974-1.355-6.839-5.199-6.839-9.729 0-5.663 4.478-10.253 10-10.253"
                                transform="translate(-140 -7559) translate(56 160)"
                            ></path>
                        </svg>
                        <span className='text-[1.2em] font-medium'>Continue with GitHub</span>
                    </button>
                </div>
            </div>

            <ShoppingSVG width='50%' className='hidden sm:block px-[6em] py-[4em]' />
        </section>
    )
}

export default Register