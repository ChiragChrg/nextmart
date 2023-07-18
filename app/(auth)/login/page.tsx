"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signIn, getProviders, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const page = () => {
    const [provider, setProvider] = useState<any | null>({})
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const FetchProviders = async () => {
            const response = await getProviders()
            setProvider(response)
            console.log("Providers", provider)
        }
        FetchProviders()

        if (session) {
            router.push("/")
            console.log("sessionLogin", session)
        }
    }, [session])

    return (
        <div className='flex flex-col'>
            LOGIN
            <Link href="/">BACK</Link>

            {provider && Object.keys(provider)?.map((obj: any) => {
                return <button key={provider[obj].id} onClick={() => signIn(provider[obj].id)}>
                    {provider[obj].name}
                </button>
            })
            }
        </div>
    )
}

export default page