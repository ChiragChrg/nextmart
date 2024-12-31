import { Fragment } from 'react'
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from '@/lib/utils'

type Props = {
    defaultRoute?: string,
    routes?: string[],
    className?: string,
}

const BreadCrumbs = ({ routes = [], className = "" }: Props) => {

    return (
        <div className={cn("w-full hidden lg:flex justify-start items-center", className)}>
            <Link href={`/`} className='capitalize'>
                Home
            </Link>

            {routes?.map((path, index) => {
                return (
                    <Fragment key={index}>
                        <ChevronRight size={18} className="text-slate-400" />
                        <Link href={`/${path?.toLowerCase()}`} className='capitalize last:text-primary last:font-medium'>
                            {path?.includes("/") ? path?.split("/").pop()?.replaceAll("%20", " ") : path.replaceAll("%20", " ")}
                        </Link>
                    </Fragment>
                )
            }
            )}
        </div>
    )
}

export default BreadCrumbs