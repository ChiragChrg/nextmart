"use client"

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CarouselSlot from './components/CarouselSlot'
import { CarouselType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getAllCarousel } from '@/app/actions/AdminActions'

const Carousel = () => {
    const { data, status } = useQuery({
        queryKey: ['fetch-all-carousel'],
        queryFn: async () => {
            try {
                const res = await getAllCarousel();
                console.log("OrderFetch_Res", res)
                if (res.status === 200)
                    return res.response as CarouselType[];
            } catch (error) {
                console.error('Error fetching Cart:', error);
            }
            return null;
        }
    });

    // const mockCarousel: CarouselType[] = [
    //     {
    //         id: "askasmsdsd",
    //         title: "Halwa",
    //         subtitle: "The Brand New Halwa!",
    //         description: "Savour every bite.",
    //         poster: "https://placehold.co/600x400/000000/FFF",
    //         productUrl: "https://placehold.co/600x400/000000/FFF",
    //         status: "inactive"
    //     },
    //     {
    //         id: "askasmaxcxc",
    //         title: "Laddu",
    //         subtitle: "The Brand New Laddu!",
    //         description: "Savour every bite.",
    //         poster: "https://placehold.co/600x400/red/FFF",
    //         productUrl: "https://placehold.co/600x400/000000/FFF",
    //         status: "inactive"
    //     },
    //     {
    //         id: "askasmcvcbgn",
    //         title: "TV",
    //         subtitle: "The Brand New TV!",
    //         description: "Savour every bite.",
    //         poster: "https://placehold.co/600x400/green/FFF",
    //         productUrl: "https://placehold.co/600x400/000000/FFF",
    //         status: "inactive"
    //     },
    // ]

    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center mb-4">
                <h1 className='text-[2em] font-bold'>Carousel</h1>

                <Button className='flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt text-[1em]' asChild>
                    <Link href={"carousel/new"}>
                        <PlusIcon />
                        <span>Add Carousel</span>
                    </Link>
                </Button>
            </div>

            <div className="">
                <h2>Active Carousel</h2>
                <CarouselSlot data={data ?? []} />
            </div>
        </section>
    )
}

export default Carousel