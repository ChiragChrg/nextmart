"use client" //temp
import Header from "@components/Header"
import Link from "next/link"
import { signOut } from "next-auth/react"

const page = () => {
  return (
    <>
      <Header />
      <Link href="/"> ROOT </Link>
      <button onClick={() => signOut()}>SIGN OUT</button>
    </>
  )
}

export default page