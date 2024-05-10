import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

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

    return (
        // <div className="bg-red-500 w-full max-w-sm">
        <Carousel
            opts={{
                loop: true,
                align: "center"
            }}
            className="bg-red-500/30 w-full max-w-sm lg:max-w-[90%]">
            <CarouselContent>
                {mockCarousel.map((item, index) => (
                    <CarouselItem key={index} className="p-4 pl-8">
                        <div
                            className="bg-primaryClr w-full h-full min-h-[500px] p-4 rounded-md">
                            <span className='hidden tablet:block text-[1em] font-bold tracking-wider'>{item?.title}</span>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        // </div>

    )
}
