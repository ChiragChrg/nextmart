"use client"

import { useEffect, useState } from "react"
import { ThemeButton, CartButton, OrdersButton } from "./Buttons"
import Search from "./Search"
import UserAvatar from "./UserAvatar"
import LogoSVG from "./SVGs/LogoSVG"
import IconSVG from "./SVGs/IconSVG"
import Link from "next/link"

const Header = ({ hideSearch = false }: { hideSearch?: boolean }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        setIsMobile(window?.innerWidth <= 750)
    }, [])

    if (isMobile)
        return (
            <>
                <header className="bg-baseClr w-full flex justify-between items-center px-4 py-3 pb-1">
                    <Link href="/">
                        <IconSVG width="30px" />
                    </Link>
                    {!hideSearch && <UserAvatar />}

                    {hideSearch && <div className="flex gap-4 items-center">
                        <ThemeButton />
                        <Link href="/" className='bg-primaryClr px-2 py-1 text-white rounded flex_center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>

                            <span>Back</span>
                        </Link>
                    </div>}
                </header>

                {!hideSearch &&
                    <div className="sticky top-0 z-10 w-full flex_center px-4 py-2 bg-gradient-to-b from-baseClr backdrop-blur-[1px]">
                        <Search hideSearchBtn />
                    </div>
                }
            </>
        )
    else
        return (
            <header className="bg-baseClr sticky top-0 z-10 w-full flex justify-between items-center p-3 px-4">
                <Link href="/">
                    <LogoSVG width="200px" />
                </Link>

                {!hideSearch &&
                    <>
                        <Search />

                        <div className="flex gap-3 items-center">
                            <ThemeButton className='header_btn' width="25px" height="25px" />
                            <OrdersButton className='header_btn' width="25px" height="25px" />
                            <CartButton className='header_btn' width="25px" height="25px" />
                            <UserAvatar />
                        </div>
                    </>
                }

                {hideSearch && <div className="flex gap-4 items-center">
                    <ThemeButton />
                    <Link href="/" className='bg-primaryClr px-2 py-1 text-white rounded flex_center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>

                        <span>Back</span>
                    </Link>
                </div>}
            </header>
        )
}

export default Header