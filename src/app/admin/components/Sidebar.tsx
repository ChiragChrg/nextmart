'use client'
import { adminLogout } from '@/app/actions/AdminActions'
import { TextLogoSVG } from '@/assets/SVGs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GalleryHorizontalIcon, LayoutGridIcon, LogOutIcon, PackageIcon, ShoppingBagIcon, SwatchBookIcon, User2Icon, UsersRoundIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const Sidebar = () => {
    const { data: session } = useSession()
    const pathname = usePathname()
    const router = useRouter()

    const handleAdminLogout = async () => {
        const res = await adminLogout();
        if (res.status === 200) {
            toast.success(res.message);
            router.push("/admin");
        } else {
            toast.error(res.message);
        }
    }

    const NavigationList = [
        {
            title: "Dashboard",
            path: "/admin/dashboard",
            icon: <LayoutGridIcon />,
        },
        // {
        //     title: "Category",
        //     path: "/admin/category",
        //     icon: <SwatchBookIcon />,
        // },
        {
            title: "Product",
            path: "/admin/products",
            icon: <PackageIcon />,
        },
        {
            title: "Orders",
            path: "/admin/orders",
            icon: <ShoppingBagIcon />,
        },
        {
            title: "Customers",
            path: "/admin/customers",
            icon: <UsersRoundIcon />,
        },
        // {
        //     title: "Carousel",
        //     path: "/admin/carousel",
        //     icon: <GalleryHorizontalIcon />,
        // },
    ]

    return (
        <aside className='w-full sm:w-1/5 sm:min-w-[265px] h-full flex_center flex-col bg-secondaryClr relative'>
            <Link href="/admin" className="flex_center gap-2 w-full p-2">
                <TextLogoSVG width='150px' />
                <span className="text-[1.5em]">| ADMIN</span>
            </Link>

            <nav className='flex flex-col gap-2 px-2 py-4 w-full h-full'>
                {NavigationList.map((nav, index) => (
                    <Link
                        key={index}
                        href={nav.path}
                        className={cn('flex gap-4 p-3 rounded-md bg-secondaryClr_Alt', pathname.includes(nav.path) && "bg-primaryClr text-white")}>
                        {nav.icon}
                        <span>{nav.title}</span>
                    </Link>
                ))}
            </nav>

            <div className="w-[95%] flex justify-between items-center gap-4 p-2 rounded-md bg-secondaryClr_Alt">
                <div className="flex_center gap-3">
                    {session?.user?.image ?
                        <Image src={session?.user?.image} alt="ProfileImage" width={40} height={40} className='rounded-full' />
                        :
                        <div className="bg-primaryClr flex_center aspect-square text-white p-1 rounded-full w-[40px] h-[40px]">
                            <User2Icon className="w-full" />
                        </div>
                    }
                    <span className="text-[1em]">{session?.user?.name}</span>
                </div>

                <Button variant={'destructive'} size={'icon'} title='Logout' onClick={handleAdminLogout}>
                    <LogOutIcon />
                </Button>
            </div>
        </aside >
    )
}

export default Sidebar