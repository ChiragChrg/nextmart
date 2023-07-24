"use client"

import { useEffect, useState } from "react"
import { ThemeButton, CartButton, OrdersButton } from "./Buttons"
import Search from "./Search"
import UserAvatar from "./UserAvatar"
import LogoSVG from "./SVGs/LogoSVG"
import IconSVG from "./SVGs/IconSVG"

const Header = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        setIsMobile(window?.innerWidth <= 750)
    }, [])

    if (isMobile)
        return (
            <>
                <header className="bg-baseClr w-full flex justify-between items-center px-4 py-3 pb-1">
                    <IconSVG width="35px" />
                    <UserAvatar />
                </header>

                <div className="sticky top-0 z-10 w-full flex_center px-4 py-2 bg-gradient-to-b from-baseClr backdrop-blur-[1px]">
                    <Search hideSearchBtn />
                </div>
            </>
        )
    else
        return (
            <header className="bg-baseClr sticky top-0 z-10 w-full flex justify-between items-center p-3 px-6">
                <LogoSVG width="200px" />

                <Search />

                <div className="flex gap-3 items-center">
                    <ThemeButton className='header_btn' width="25px" height="25px" />
                    <OrdersButton className='header_btn' width="25px" height="25px" />
                    <CartButton className='header_btn' width="25px" height="25px" />
                    <UserAvatar />
                </div>
            </header>
        )
}

export default Header