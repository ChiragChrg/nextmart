import Link from "next/link"
import { SearchIcon } from "lucide-react"
import { CartButton, OrdersButton } from "../Buttons"
import { TextLogoSVG } from "@/assets/SVGs"
import UserAvatar from "../UserAvatar"
import Search from "../Search"

const Header = () => {
    return (
        <>
            {/* Mobile Header -> Hides on large screen */}
            <header className="lg:hidden flex justify-between items-center bg-background w-full px-4 py-3 pb-1">
                <div className="flex justify-between w-full">
                    <Link href="/">
                        {/* <Image src={LogoSVG} alt="LogoSVG" width={30} /> */}
                        <TextLogoSVG width='150px' />
                    </Link>

                    <div className="flex_center gap-4">
                        {/* <SearchIcon /> */}
                        <UserAvatar />
                    </div>
                </div>
            </header>

            {/* Mobile Searchbar -> Hides on large screen */}
            <div className="lg:hidden sticky top-0 z-10 w-full flex_center px-4 py-2 bg-gradient-to-b from-background backdrop-blur-[1px]">
                <Search />
                {/* <SearchIcon /> */}
            </div>

            {/* Desktop Header -> Hides on small screen */}
            <header className="hidden lg:flex justify-between items-center gap-4 bg-background sticky top-0 z-10 w-full p-3 px-4">
                <Link href="/">
                    <TextLogoSVG width='200px' />
                </Link>

                {/* <Search /> */}
                <Search />

                <div className="flex gap-3 items-center">
                    <OrdersButton className='header_btn' width="25px" height="25px" />
                    <CartButton className='header_btn' width="25px" height="25px" />
                    <UserAvatar />
                </div>
            </header>
        </>
    )
}

export default Header