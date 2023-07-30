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
        poster: "http://via.placeholder.com/600x400"
    },
    {
        title: "Laddu",
        textA: "The Brand New Laddu!",
        textB: "Savour every bite.",
        poster: "http://via.placeholder.com/600x400"
    },
    {
        title: "Ganja",
        textA: "The Brand New Ganja!",
        textB: "Savour every bite.",
        poster: "http://via.placeholder.com/600x400"
    },
    {
        title: "Laptop",
        textA: "The Brand New Laptop!",
        textB: "Savour every Moment.",
        poster: "http://via.placeholder.com/600x400"
    },
    {
        title: "Dress",
        textA: "The Brand New Dress!",
        textB: "Savour every Style.",
        poster: "http://via.placeholder.com/600x400"
    },
    {
        title: "Shoes",
        textA: "The Brand New Shoes!",
        textB: "Savour every Step.",
        poster: "http://via.placeholder.com/600x400"
    }
]


const Carousel = () => {
    const [carousel, setCarousel] = useState<Array<carouselType>>(mockCarousel)
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [swipeStartX, setSwipeStartX] = useState<number | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === mockCarousel.length - 1) ? 0 : prev + 1);
        }, 5000);

        const handleSwipeStart = (evt: TouchEvent) => {
            setSwipeStartX(evt.touches[0].clientX)
        }

        const handleSwipeEnd = (evt: TouchEvent) => {
            const swipeEndX = evt.changedTouches[0].clientX
            const swipeDistance = swipeEndX - swipeStartX!

            const swipeThreshold = 100

            if (swipeDistance > swipeThreshold) {
                setCurrentSlide(prev => (prev === 0) ? mockCarousel.length - 1 : prev - 1);
            } else if (swipeDistance < -swipeThreshold) {
                setCurrentSlide(prev => (prev === mockCarousel.length - 1) ? 0 : prev + 1);
            }
        }

        document.addEventListener('touchstart', handleSwipeStart);
        document.addEventListener('touchend', handleSwipeEnd);

        return () => {
            document.removeEventListener('touchstart', handleSwipeStart);
            document.removeEventListener('touchend', handleSwipeEnd);
            clearInterval(interval);
        };
    }, [swipeStartX])

    return (
        <div className="px-4 py-2 flex justify-center flex-col tablet:flex-row gap-2 tablet:gap-10 mx-auto max-w-[65em]">
            <div className="relative w-full h-[250px] sm:h-[400px] flex flex-col rounded-xl overflow-hidden">
                <Image
                    src={carousel[currentSlide]?.poster as string}
                    alt='img'
                    fill={true}
                    style={{ objectFit: "cover" }}
                    className='!relative' />

                {/* Dark Overlay */}
                <div className="bg-gradient-to-t from-secondaryDarkClr via-transparent w-full h-full absolute"></div>

                <span className='absolute bottom-0 text-[1.5em] tablet:text-[3em] font-josefin font-bold w-full p-2'>
                    {carousel[currentSlide]?.textA} <br /> {carousel[currentSlide]?.textB}
                </span>
            </div>

            <div className="flex justify-between tablet:w-1/8 tablet:flex-col gap-2 px-[5em] tablet:px-0">
                {mockCarousel?.map((obj: carouselType, index: number) => {
                    return <div
                        style={index === currentSlide ? { backgroundColor: "var(--primary)", color: "#fff" } : {}}
                        className="bg-secondaryClr w-[10px] h-[10px] tablet:w-[150px] tablet:h-full flex_center rounded-full tablet:rounded-md cursor-pointer"
                        onClick={() => setCurrentSlide(index)}
                        key={index}>
                        <span className='hidden tablet:block text-[1em] font-bold tracking-wider'>{obj?.title}</span>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Carousel