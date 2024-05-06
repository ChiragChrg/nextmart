import Link from "next/link"
import { LogoSVG } from "@/assets"
import { User2Icon } from "lucide-react"
import { CartButton, OrdersButton } from "../Buttons"
import Image from "next/image"
import { TextLogoSVG } from "@/assets/SVGs"
import UserAvatar from "../UserAvatar"

const Header = () => {
    return (
        <>
            {/* Mobile Header -> Hides on large screen */}
            <header className="lg:hidden flex justify-between items-center bg-baseClr w-full px-4 py-3 pb-1">
                <div className="flex justify-between w-full">
                    <Link href="/">
                        <Image src={LogoSVG} alt="LogoSVG" width={30} />
                    </Link>

                    <User2Icon />
                </div>
            </header>

            {/* Mobile Searchbar -> Hides on large screen */}
            {/* <div className="lg:hidden sticky top-0 z-10 w-full flex_center px-4 py-2 bg-gradient-to-b from-baseClr backdrop-blur-[1px]">
                <Search />
            </div> */}

            {/* Desktop Header -> Hides on small screen */}
            <header className="hidden lg:flex justify-between items-center gap-4 bg-baseClr sticky top-0 z-10 w-full p-3 px-4">
                <Link href="/">
                    <TextLogoSVG width='200px' />
                </Link>

                {/* <Search /> */}

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