"use client" //temp
import Header from "@components/Header"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

const Home = () => {
  const { data: session } = useSession()

  return (
    <>
      <Header />
      <Link href="/"> ROOT </Link>
      {session && <button onClick={() => signOut()}>SIGN OUT</button>}
    </>
  )
}

export default Home