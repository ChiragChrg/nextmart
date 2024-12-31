import Link from "next/link"
import { TextLogoSVG } from "@/assets/SVGs"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

const AdminHeader = () => {
    return (
        <>
            {/* Mobile Header -> Hides on large screen */}
            <header className="lg:hidden flex justify-between items-center bg-background w-full px-4 py-3 pb-1">
                <div className="flex justify-between w-full">
                    <Link href="/admin" className="flex items-center gap-2">
                        {/* <Image src={LogoSVG} alt="LogoSVG" width={30} /> */}
                        <TextLogoSVG width='150px' />
                        <span className="text-[1.8em]">| ADMIN</span>
                    </Link>
                </div>
            </header>

            {/* Desktop Header -> Hides on small screen */}
            <header className="hidden lg:flex justify-between items-center gap-4 bg-background sticky top-0 z-10 w-full p-3 px-4">
                <Link href="/admin" className="flex items-center gap-2">
                    <TextLogoSVG width='200px' />
                    <span className="text-[1.8em]">| ADMIN</span>
                </Link>
                <Link href="/">
                    <Button className="bg-primaryClr gap-4">
                        <ShoppingBag />
                        <span>Back to Shop</span>
                    </Button>
                </Link>
            </header>
        </>
    )
}

export default AdminHeader