"use client"

import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CarouselType } from '@/types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCarouselStatus } from '@/app/actions/AdminActions'

type Props = {
    data: CarouselType[]
}

const CarouselSlot = ({ data }: Props) => {
    const [poster, setPoster] = useState<CarouselType>()
    const queryClient = useQueryClient()

    const handlePosterSelect = async (carouselId: string) => {
        try {
            const res = await updateCarouselStatus(carouselId, "active")
            if (res.status !== 200)
                throw new Error(res.message)

            const posterData = res.response as CarouselType
            setPoster(posterData)
            queryClient.invalidateQueries({ queryKey: ['carousel-list'] })
            toast.success("Added Carousel Poster!")
        } catch (error) {
            console.log(error)
        }
    }

    const handlePosterRemove = async (carouselId: string) => {
        try {
            const res = await updateCarouselStatus(carouselId, "inactive")
            if (res.status !== 200)
                throw new Error(res.message)

            const posterData = res.response as CarouselType
            setPoster(posterData)
            queryClient.invalidateQueries({ queryKey: ['carousel-list'] })
            toast.success("Removed Carousel Poster!")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col bg-secondaryClr p-2'>
            {!poster ?
                <Dialog>
                    <DialogTrigger className='w-full h-[60px] border border-dashed border-primaryClr rounded-md'>
                        Select Slot Poster
                    </DialogTrigger>
                    <DialogContent className={cn('max-w-[800px]')}>
                        <DialogHeader>
                            <DialogTitle>Select Carousel Poster</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>

                        {data.map((item, index) => {
                            if (item.status === "active") return

                            return (
                                <div key={index} className="flex justify-between items-center gap-8 border-b border-secondaryClr_Alt pb-4 last-of-type:border-none">
                                    <Image
                                        src={item.poster}
                                        alt={`Poster ${item.title}`}
                                        width={150}
                                        height={150}
                                        unoptimized
                                        className="object-cover inset-0 h-full rounded-xl aspect-video" />

                                    <div className="flex flex-col min-w-[400px]">
                                        <span className='text-[1.2em] font-bold'>{item.title}</span>
                                        <span className='text-[1em] font-bold'>{item.subtitle}</span>
                                        <span>{item.description}</span>
                                    </div>

                                    <Button onClick={() => handlePosterSelect(item.id)} className='bg-primaryClr hover:bg-primaryClr_Lite'>Select Poster</Button>
                                </div>
                            )
                        })}
                    </DialogContent>
                </Dialog>
                :
                <div className="">
                    <Image
                        src={poster.poster}
                        alt={`Poster ${poster.title}`}
                        width={150}
                        height={150}
                        unoptimized
                        className="object-cover inset-0 h-full rounded-xl aspect-video" />

                    <div className="flex flex-col min-w-[400px]">
                        <span className='text-[1.2em] font-bold'>{poster.title}</span>
                        <span className='text-[1em] font-bold'>{poster.subtitle}</span>
                        <span>{poster.description}</span>
                    </div>
                </div>
            }

        </div>
    )
}

export default CarouselSlot