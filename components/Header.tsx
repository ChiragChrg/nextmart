// import { Logo } from "@public/assets"
import Link from "next/link"
// import Image from "next/image"
import Search from "./Search"
import { ThemeButton, CartButton, OrdersButton } from "./Buttons"
import UserAvatar from "./UserAvatar"

const Header = () => {
    return (
        <header className="bg-baseClr border border-textClr w-full flex justify-between items-center p-3 px-6">
            {/* Site Logo */}
            <Link href="/" className="flex_center text-[1.3em] font-bold text-primaryClr">
                {/* <Image src={Logo} alt="Next_Mart_Logo" /> */}
                NEXT MART
            </Link>

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