"use client"
import { useFetchAllOrders } from '@/hooks/useFetchData'
import { User2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const RecentOrders: React.FC = ({ }) => {
    const { data: orderList } = useFetchAllOrders()

    return <div className="flex flex-col justify-evenly p-2 w-1/2 border border-secondaryClr rounded-lg">
        <h3 className='font-bold text-[1.2em]'>Recent Orders</h3>
        <div className="flex flex-col gap-2">
            {orderList?.toReversed().slice(0, 5).map(order => (
                order.items.map((item, index) => (
                    <div className="flex gap-4 items-center" key={index}>
                        <div className="w-[80px] relative aspect-square">
                            <Image
                                src={item.product?.images[0]?.imageUrl ?? "http://via.placeholder.com/400x400"}
                                alt={item.product?.images[0]?.altText ?? "Product_Image"}
                                placeholder="blur"
                                blurDataURL={item.product?.images[0]?.blurData ?? "http://via.placeholder.com/400x400"}
                                fill={true}
                                className="object-cover rounded-md"
                            />
                        </div>

                        <div className='flex flex-col justify-center min-w-[300px]'>
                            <span className='font-bold text-[1.3em] overflow-ellipsis'>{item.product?.longTitle}</span>
                            <span className='overflow-ellipsis'>{item.product?.description}</span>
                        </div>

                        <div className='flex_center flex-col'>
                            <span>Quantity</span>
                            <div className='text-1.2em font-bold'>x {item.quantity}</div>
                        </div>
                        <div className='flex_center flex-col'>
                            <span>Price</span>
                            <div className="font-sans font-bold text-[1em] text-right">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "INR",
                                }).format(item.price)}
                            </div>
                        </div>
                    </div>
                ))
            ))}
        </div>
    </div>
}

export default RecentOrders