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
            <header className="bg-baseClr w-full flex_center flex-col gap-2 py-3 px-4">
                <div className="w-full flex justify-between">
                    <IconSVG width="35px" />
                    <UserAvatar />
                </div>

                <Search hideSearchBtn />
            </header>
        )
    else
        return (
            <header className="bg-baseClr w-full flex justify-between items-center p-3 px-6">
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