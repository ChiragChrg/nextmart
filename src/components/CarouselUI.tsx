"use client"

import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export const CarouselUI = () => {
    type carouselType = {
        title: string,
        textA: string,
        textB: string,
        poster: string
    }[]

    const mockCarousel: carouselType = [
        {
            title: "Halwa",
            textA: "The Brand New Halwa!",
            textB: "Savour every bite.",
            poster: "https://placehold.co/600x400/000000/FFF"
        },
        {
            title: "Laddu",
            textA: "The Brand New Laddu!",
            textB: "Savour every bite.",
            poster: "https://placehold.co/600x400/red/FFF"
        },
        {
            title: "TV",
            textA: "The Brand New TV!",
            textB: "Savour every bite.",
            poster: "https://placehold.co/600x400/green/FFF"
        },
        {
            title: "Laptop",
            textA: "The Brand New Laptop!",
            textB: "Savour every Moment.",
            poster: "https://placehold.co/600x400/yellow/FFF"
        },
        {
            title: "Dress",
            textA: "The Brand New Dress!",
            textB: "Savour every Style.",
            poster: "https://placehold.co/600x400/blue/FFF"
        },
        {
            title: "Shoes",
            textA: "The Brand New Shoes!",
            textB: "Savour every Step.",
            poster: "https://placehold.co/600x400/purple/FFF"
        }
    ]

    return (
        // <div className="bg-red-500 w-full max-w-sm">
        <Carousel
            opts={{
                loop: true,
                align: "center",
            }}
            plugins={[
                Autoplay({ delay: 5000 })
            ]}
            className="w-full max-w-sm lg:max-w-[100%] relative">
            <CarouselContent>
                {mockCarousel.map((item, index) => (
                    <CarouselItem key={index} className="p-4 pl-8">
                        <div
                            className="bg-primary/20 w-full h-full min-h-[300px] p-4 rounded-2xl flex justify-between relative px-[3em] overflow-hidden">
                            <div className="flex flex-col justify-center sm:w-1/2 sm:pl-8 text-white z-10">
                                <h2 className='text-[2em] sm:text-[3em] font-bold tracking-wider'>{item?.title}</h2>
                                <span className='text-[1em] sm:text-[1.5em]'>{item.textA}</span>
                                <span className='text-[1em] sm:text-[1.5em]'>{item.textB}</span>
                            </div>
                            <div className="sm:hidden bg-foreground/20 absolute inset-0"></div>

                            <Image
                                src={item.poster}
                                alt={`Poster ${item.title}`}
                                width={100}
                                height={100}
                                unoptimized
                                className="w-max object-cover inset-0 h-full rounded-xl absolute sm:relative z-[-10] sm:z-0" />

                            <Image
                                src={item.poster}
                                alt={`Poster ${item.title}`}
                                width={100}
                                unoptimized
                                height={100}
                                className="inset-0 w-full h-full absolute object-cover scale-125 z-[-1] rounded-2xl blur-xl opacity-40" />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="absolute bottom-12 sm:left-10 w-full sm:w-1/2 h-max">
                <CarouselPrevious />
                <CarouselNext />
                <CarouselDots />
            </div>
        </Carousel>
        // </div>
    )
}
