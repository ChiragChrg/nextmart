"use client"
import Image from 'next/image'
import StarSVG from './SVGs/StarSVG'
import HeartSVG from './SVGs/HeartSVG'
import { toast } from 'react-toastify'

type ProductType = {
    name: string | null,
    image: string | null,
    rating: number | null,
    price: number | null,
}

type Props = {
    data: ProductType | null,
}

const ProductCard = ({ data }: Props) => {
    const BlurData = "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mM8PZMBAzAOZUEAN/kN81AIvjgAAAAASUVORK5CYII="

    return (
        <div
            onClick={() => toast.success(data?.name)}
            className="relative flex_center flex-col rounded-md overflow-hidden cursor-pointer bg-slate-500/10">
            <Image
                src={data?.image as string}
                alt='img'
                fill={true}
                style={{ objectFit: "cover" }}
                placeholder='blur'
                blurDataURL={BlurData}
                className='!relative' />

            <HeartSVG width='25px' height='25px' className='absolute top-2 right-2' />

            <div className="w-full flex flex-col p-1 px-2 bg-baseLiteClr">
                <h3>{data?.name}</h3>
                {data?.rating && <StarRating rating={data?.rating} />}

                <div className="p-1 px-2">
                    <h3 className='font-sans font-bold'>{data?.price && data?.price.toLocaleString("en-IN", {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}</h3>
                </div>
            </div>
        </div>
    )
}

export const StarRating = ({ rating }: { rating: number }) => {
    return <div className="flex relative w-full">
        <StarSVG width='20px' height='20px' isFilled={1 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={2 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={3 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={4 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={5 <= rating} />
    </div>
}

export default ProductCard