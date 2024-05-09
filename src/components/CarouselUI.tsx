import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const CarouselUI = () => {
    return (
        // <div className="bg-red-500 w-full max-w-sm">
        <Carousel
            opts={{
                loop: true,
                align: "center"
            }}
            className="bg-red-500/30 w-full max-w-sm lg:max-w-[80%]">
            <CarouselContent>
                <CarouselItem>Hello</CarouselItem>
                <CarouselItem>Bro</CarouselItem>
                <CarouselItem>Wassup</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        // </div>

    )
}
