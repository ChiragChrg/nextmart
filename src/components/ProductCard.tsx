import Link from 'next/link'
import Image from 'next/image'
import { productType } from './ProductSection'
import StarRating from './CustomUI/StarRating'

type Props = {
    data: productType | null,
}

const ProductCard = ({ data }: Props) => {
    return (
        <Link
            href={`product/${data?.category}/${data?.title}`}
            className="relative flex_center flex-col rounded-md overflow-hidden cursor-pointer">
            <Image
                src={data?.images[0].imageUrl as string}
                alt={data?.images[0].altText as string}
                fill={true}
                style={{ objectFit: "cover" }}
                placeholder='blur'
                blurDataURL={data?.images[0].blurData as string}
                className='!relative rounded-md' />

            {/* <HeartIcon width='25px' height='25px' className='absolute top-2 right-2' /> */}

            <div className="w-full flex flex-col p-1 px-2">
                <h3 className='font-bold'>{data?.title}</h3>
                <div className='flex items-center gap-1'>
                    <span className='text-[0.9em] pt-1'>{data?.ratings.average?.toFixed(1)}</span>
                    <StarRating rating={data?.ratings.average || 0} />
                    <span className='text-[0.8em]'>({data?.ratings.reviewCount?.toLocaleString("en-US", {
                        notation: "compact",
                        compactDisplay: "short"
                    })})</span>
                </div>


                <div className="p-1 px-2 flex items-center gap-2">
                    <h3 className='font-sans text-[1.2em] font-bold'>{data?.price?.current?.toLocaleString("en-IN", {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}</h3>

                    <span className='font-sans line-through'>{data?.price?.original?.toLocaleString("en-IN", {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}</span>

                    <div className='flex_center gap-1 font-bold text-red-500'>
                        <span> -{data?.price?.discount}%</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard