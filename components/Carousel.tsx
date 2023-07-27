"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type carouselType = {
    title: string,
    textA: string,
    textB: string,
    poster: string
}

const mockCarousel: Array<carouselType> = [
    {
        title: "Halwa",
        textA: "The Brand New Halwa!",
        textB: "Savour every bite.",
        poster: "https://placehold.co/600x400"
    },
    {
        title: "Laddu",
        textA: "The Brand New Laddu!",
        textB: "Savour every bite.",
        poster: "https://placehold.co/600x400"
    },
    {
        title: "Ganja",
        textA: "The Brand New Ganja!",
        textB: "Savour every bite.",
        poster: "https://placehold.co/600x400"
    },
    {
        title: "Laptop",
        textA: "The Brand New Laptop!",
        textB: "Savour every Moment.",
        poster: "https://placehold.co/600x400"
    },
    {
        title: "Dress",
        textA: "The Brand New Dress!",
        textB: "Savour every Style.",
        poster: "https://placehold.co/600x400"
    },
    {
        title: "Shoes",
        textA: "The Brand New Shoes!",
        textB: "Savour every Step.",
        poster: "https://placehold.co/600x400"
    }
]

const Carousel = () => {
    const [carousel, setCarousel] = useState<Array<carouselType>>(mockCarousel)
    const [currentSlide, setCurrentSlide] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === mockCarousel.length - 1) ? 0 : prev + 1);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div className="px-10 py-2 flex gap-10 w-full">
            <div className="w-full h-[400px] bg-red-500 flex justify-evenly items-center rounded-xl relative overflow-hidden">
                <span className='text-[3em] font-bold w-full p-2'>{carousel[currentSlide]?.textA} <br /> {carousel[currentSlide]?.textB}</span>
                <Image
                    loader={() => carousel[currentSlide]?.poster!}
                    unoptimized
                    src={carousel[currentSlide]?.poster!}
                    alt='img'
                    fill={true}
                    style={{ objectFit: "cover" }}
                    className='!relative' />
            </div>

            <div className="flex justify-between w-1/8 flex-col gap-2">
                {mockCarousel?.map((obj: carouselType, index: number) => {
                    return <div
                        style={index === currentSlide ? { backgroundColor: "var(--primary)", color: "#fff" } : {}}
                        className="bg-secondaryClr w-[150px] h-full flex_center rounded-md"
                        key={index}>
                        <span className='text-[1em] font-bold'>{obj?.title}</span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Carousel