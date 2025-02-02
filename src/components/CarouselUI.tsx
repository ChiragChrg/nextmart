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
        subtitle: string,
        description: string,
        poster: string
    }[]

    const mockCarousel: carouselType = [
        {
            title: "Samsung Galaxy Z Fold 6",
            subtitle: "PC-like power in your pocket",
            description: "Put PC-like power in your pocket, Galaxy Z Fold6. More powerful than ever with its super-slim, productive screen. Now super-charged with Galaxy AI on foldables.",
            poster: "https://images.samsung.com/is/image/samsung/assets/in/2407/pfs/01-hd01-Q6-KV-pc-1440x640.jpg?imwidth=1366"
        },
        {
            title: "Xiaomi Pad 7",
            subtitle: "Snapdragon 7+ Gen 3",
            description: "Starting at Rs.26,999*",
            poster: "https://i03.appmifile.com/792_operator_in/16/01/2025/39b73a92c44755cf833ba56ee03ca882.png"
        },
        {
            title: "Spring Sale",
            subtitle: "Women's Cloths",
            description: "Special offer 70% Off",
            poster: "https://img.freepik.com/free-psd/banner-spring-sale-with-woman-leaves_23-2148437361.jpg"
        },
        {
            title: "The Shoes",
            subtitle: "Brand new Sneakers",
            description: "Buy now! Limited Edition",
            poster: "https://static.vecteezy.com/system/resources/previews/008/564/775/non_2x/sport-shoes-banner-for-website-with-button-ui-design-illustration-vector.jpg"
        },
        {
            title: "Men's Fashion",
            subtitle: "Trending Outfits!",
            description: "Starting at Rs.500/-",
            poster: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/men%27s-fashion-template-design-2bf4c554ccc9a423db15db6e58f770b5_screen.jpg?ts=1687028854"
        },
        {
            title: "Dell G15 Laptop",
            subtitle: "Ultimate Gaming Laptop",
            description: "Intel i5-12th Gen, RTX 3050",
            poster: "https://i.pinimg.com/736x/57/13/f0/5713f0ba52589891c5c9fb4320c5affe.jpg"
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
                                <span className='text-[1em] sm:text-[1.5em]'>{item.subtitle}</span>
                                <span className='text-[1em] sm:text-[1em]'>{item.description}</span>
                            </div>

                            <div className="relative w-[700px] h-[400px] z-10">
                                <Image
                                    src={item.poster}
                                    alt={`Poster ${item.title}`}
                                    fill={true}
                                    unoptimized
                                    className="w-max object-cover inset-0 h-full rounded-xl absolute sm:relative z-[-10] sm:z-0" />
                            </div>

                            <div className="bg-foreground/20 absolute inset-0"></div>
                            <Image
                                src={item.poster}
                                alt={`Poster_Background ${item.title}`}
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
