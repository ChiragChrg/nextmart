import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Variants = ({ variants, activeVariant }: { variants: any, activeVariant: any }) => {
    // console.log({ variants })

    return (
        <div className="flex flex-col gap-4 py-2">
            {Object.keys(variants)?.map((variantKey: string, index: number) => {
                const variantItems = variants[variantKey];

                return (
                    <div key={index}>
                        <span className="font-bold capitalize">{variantKey}</span>
                        <div className="flex gap-2 flex-wrap">
                            {variantItems?.map((item: any, indx: number) => {
                                const isActive = item?.[variantKey] === activeVariant?.[variantKey];

                                return (
                                    <Link href={item?.productSlug} key={indx}>
                                        <Button
                                            variant={"outline"}
                                            className={cn("bg-background border-primaryClr font-bold", isActive ? "bg-primaryClr text-background" : "bg-background text-foreground")}
                                        >
                                            {item?.[variantKey]}
                                        </Button>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Variants