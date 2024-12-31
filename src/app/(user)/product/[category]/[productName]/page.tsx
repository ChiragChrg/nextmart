"use client"
import BreadCrumbs from '@/components/CustomUI/BreadCrumbs'
import StarRating from '@/components/CustomUI/StarRating'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Variants from './components/Variants'
import { CreditCardIcon, HeartIcon, MinusIcon, PlusIcon, Share2Icon, ShoppingCartIcon, TriangleAlertIcon } from 'lucide-react'

const ProductDetails = () => {
  const { category, productName } = useParams<{ category: string, productName: string }>()
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)

  const data = {
    productId: "a1b2c3d4",
    productSlug: "a1b2c3d4-Ergonomic-Office-Chair-BLUE",
    title: "Ergonomic Office Chair",
    longTitle: "Ergonomic Office Chair - Wooden, measueements, qualidy, type, dimensions, color etc",
    description: "A comfortable chair for long work hours.",
    category: "Furniture",
    brand: "OfficePro",
    price: { original: 299, current: 249, discount: 17 },
    stock: { quantity: 50, isInStock: true },
    images: [
      { imageUrl: "http://via.placeholder.com/400x400", altText: "Chair image", blurData: "blur1", averageColor: "#f0f0f0" },
      { imageUrl: "http://via.placeholder.com/400x400", altText: "Chair image", blurData: "blur1", averageColor: "#f0f0f0" },
      { imageUrl: "http://via.placeholder.com/400x400", altText: "Chair image", blurData: "blur1", averageColor: "#f0f0f0" },
      { imageUrl: "http://via.placeholder.com/400x400", altText: "Chair image", blurData: "blur1", averageColor: "#f0f0f0" }
    ],
    features: {
      variant: {
        size: "M",
        color: "White",
      }
    },
    variants: {
      size: [
        {
          productSlug: "a1b2c3d4-Ergonomic-Office-Chair-RED",
          size: "S"
        },
        {
          productSlug: "a1b2c3d4-Ergonomic-Office-Chair-RED",
          size: "M"
        },
        {
          productSlug: "a1b2c3d4-Ergonomic-Office-Chair-RED",
          size: "L"
        }
      ],
      color: [
        {
          productSlug: "a1b2c3d4-Ergonomic-Office-Chair-RED",
          color: "White"
        },
        {
          productSlug: "a1b2c3d4-Ergonomic-Office-Chair-RED",
          color: "Green"
        },
        {
          productSlug: "a1b2c3d4-Ergonomic-Office-Chair-RED",
          color: "Red"
        }
      ]
    },
    ratings: { average: 4.5, reviewCount: 32 },
    reviews: [{ reviewId: "r1", userId: "u1", rating: 5, comment: "Great chair!", date: "2024-10-26T10:00:00.000Z" }],
    tags: ["office", "chair", "ergonomic"],
  }

  const updateQuantity = (type: "increment" | "decrement") => {
    if (type === 'increment') {
      if (quantity >= 30) return
      setQuantity(prev => prev + 1)
    } else {
      if (quantity <= 1) return
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <main className='main_style'>
      <section className="flex justify-evenly gap-10">
        {/* Left section - Product Preview images */}
        <div className="w-1/2 flex justify-center items-start gap-4">
          <div className="flex flex-col gap-2">
            {data?.images?.map((img, index) => (
              <Image
                key={index}
                src={img?.imageUrl}
                alt={img?.altText}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
                placeholder='blur'
                blurDataURL={img?.blurData}
                onClick={() => setPreviewImageIndex(index)}
                className='!relative rounded-md' />
            ))}
          </div>

          <Image
            src={data?.images[previewImageIndex]?.imageUrl}
            alt={data?.images[previewImageIndex]?.altText}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
            placeholder='blur'
            blurDataURL={data?.images[previewImageIndex]?.blurData}
            className='!relative rounded-md' />
        </div>

        {/* Right section - Product Details */}
        <div className="w-max h-full">
          <BreadCrumbs
            className='text-[0.9em]'
            routes={[
              `${category}`,
              `${category}/${productName}`
            ]} />

          <h1 className='text-[1.5em]'>{data.longTitle}</h1>

          <div className='flex items-center gap-1'>
            <span className='text-[0.9em] pt-1'>{data?.ratings.average?.toFixed(1)}</span>
            <StarRating rating={data?.ratings.average || 0} />
            <span className='text-[0.8em]'>({data?.ratings.reviewCount?.toLocaleString("en-US", {
              notation: "compact",
              compactDisplay: "short"
            })})</span>
          </div>

          <div className="p-1 px-2 flex items-center gap-2">
            <h3 className='font-sans text-[1.8em] font-bold'>{data?.price?.current?.toLocaleString("en-IN", {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}</h3>

            <span className='font-sans line-through'>MRP : {data?.price?.original?.toLocaleString("en-IN", {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}</span>

            <div className='flex_center gap-1 font-bold text-red-500'>
              <span> -{data?.price?.discount}%</span>
            </div>
          </div>

          <Variants variants={data?.variants} activeVariant={data?.features?.variant} />

          <div className="flex gap-4 py-2">
            <span>Availability : </span>
            {data?.stock?.isInStock ?
              <span className="text-[1.2em] text-green-600 font-bold">In Stock</span>
              :
              <span className="text-[1.2em] text-red-600 font-bold">Out of Stock</span>
            }
          </div>

          <div className="">
            <span className="font-bold capitalize">Quantity</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size={'icon'}
                onClick={() => updateQuantity("decrement")}
                className="bg-background border-primaryClr font-bold w-8 h-8"
              >
                <MinusIcon size={20} />
              </Button>

              <span className="p-4 select-none min-w-14 text-center">{quantity}</span>

              <Button
                variant="outline"
                size={'icon'}
                onClick={() => updateQuantity("increment")}
                className="bg-background border-primaryClr font-bold w-8 h-8"
              >
                <PlusIcon size={20} />
              </Button>
            </div>
            {quantity === 30 && <span className="text-[0.9em] text-yellow-700">Maximum limit is 30</span>}
          </div>

          <div className="flex flex-col justify-start gap-4 py-2">
            <div className="flex gap-4 flex-col sm:flex-row">
              <Button variant={'secondary'} className="flex_center gap-3 bg-secondaryClr hover:bg-secondaryClr_Alt w-full max-w-[200px]">
                <HeartIcon />
                <span>Add to WishList</span>
              </Button>
              <Button variant={'secondary'} className="flex_center gap-3 bg-secondaryClr hover:bg-secondaryClr_Alt w-full max-w-[200px]">
                <Share2Icon />
                <span>Share</span>
              </Button>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Button variant={'secondary'} className="flex_center gap-3 bg-secondaryClr hover:bg-secondaryClr_Alt w-full max-w-[200px]">
                <ShoppingCartIcon />
                <span>Add to Cart</span>
              </Button>
              <Button variant={'secondary'} className="flex_center gap-3 bg-secondaryClr hover:bg-secondaryClr_Alt w-full max-w-[200px]">
                <CreditCardIcon />
                <span>Buy Now</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="pt-8">
        <h2 className='font-bold text-[1.4em]'>Product Description</h2>
      </section>
    </main>
  )
}

export default ProductDetails