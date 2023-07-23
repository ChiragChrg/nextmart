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
        setIsMobile(window.innerWidth <= 750)
    }, [window.innerWidth])

    if (isMobile)
        return (
            <header className="bg-baseClr sticky top-0 w-full flex justify-between items-center py-3 px-4">
                <IconSVG width="35px" className="mr-3" />
                <Search hideSearchBtn />
            </header>
        )
    else
        return (
            <header className="bg-baseClr sticky top-0 w-full flex justify-between items-center p-3 px-6">
                <LogoSVG width="200px" />

                <Search />

                <div className="flex gap-3 items-center">
                    <ThemeButton />
                    <OrdersButton />
                    <CartButton />
                    <UserAvatar />
                </div>
            </header>
        )
}

export default Header