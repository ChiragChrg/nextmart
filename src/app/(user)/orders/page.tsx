"use client"

import { useFetchOrders } from '@/hooks/useFetchData'
import { cn } from '@/lib/utils'
import { RootState } from '@/store'
import { BadgeIndianRupeeIcon, CheckCircleIcon, CircleXIcon, PackageSearchIcon, ReceiptTextIcon, RefreshCcwIcon, ShoppingCartIcon, TimerIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Orders = () => {
    const userId = useSelector<RootState>(state => state.user.user?.id) as string
    const { data: orderList, status: orderStatus } = useFetchOrders(userId)


    return (
        <main className='main_style'>
            <h1 className='text-[2em] font-bold'>Your <span className='text-primaryClr'>Orders</span></h1>

            <div className="flex_center flex-col gap-8 mt-4">
                {orderList?.toReversed().map((order, orderIndex) => {
                    const statusColor = order.status === "Success" ? "text-green-600" : order.status === "Processing" ? "text-yellow-600" : "text-red-600";

                    return (
                        <div key={orderIndex} className="flex flex-col w-full p-3 bg-secondaryClr_Alt rounded-lg shadow">
                            <div className="flex justify-evenly items-center gap-10 p-4 bg-background rounded-md">
                                <div className='flex flex-col gap-1 font-bold'>
                                    <div className="flex gap-2">
                                        <TimerIcon />
                                        <span>Ordered On : </span>
                                    </div>
                                    <span>
                                        {new Date(order.createdAt!).toLocaleString('en-IN', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        {new Date(order.createdAt!).toLocaleString('en-IN', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        }).toUpperCase()}
                                    </span>
                                </div>

                                <div className='flex flex-col gap-1 font-bold'>
                                    <div className="flex gap-2">
                                        <ReceiptTextIcon />
                                        <span>Order ID : </span>
                                    </div>
                                    <span>{order.razorpayOrderId}</span>
                                </div>

                                <div className='flex flex-col gap-1 font-bold'>
                                    <div className="flex gap-2">
                                        {order.status === "Success" ? <CheckCircleIcon className='text-green-600' /> :
                                            order.status === "Processing" ? <RefreshCcwIcon className='text-yellow-600' /> :
                                                <CircleXIcon className='text-red-600' />
                                        }
                                        <span>Order Status : </span>
                                    </div>
                                    <span className={statusColor}>{order.status.toUpperCase()}</span>
                                </div>

                                <div className='flex flex-col gap-1 font-bold'>
                                    <div className="flex gap-2">
                                        <BadgeIndianRupeeIcon />
                                        <span>Total Amount : </span>
                                    </div>
                                    <span className='text-[1.2em]'>
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        }).format(order.totalAmount)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 pt-4">
                                {order.items?.map((item, itemIndex) => (
                                    <div key={itemIndex} className="w-full flex justify-between items-center gap-4 bg-background/60 p-4 rounded-md">
                                        <div className="flex_center gap-8">
                                            <div className="w-[150px] relative aspect-video">
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
                                        </div>

                                        <div className="flex justify-evenly items-center gap-4 w-full">
                                            <div className='flex_center flex-col'>
                                                <span>Unit Rate</span>
                                                <div className="font-sans font-bold text-[1em]">
                                                    {new Intl.NumberFormat("en-US", {
                                                        style: "currency",
                                                        currency: "INR",
                                                    }).format(item.unitRate)}
                                                </div>
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

                                        <div className="flex justify-evenly items-center gap-4">
                                            <Link href={`/product/${item.product?.category?.categorySlug}/${item.product?.productSlug}`}>
                                                <Button className='w-full flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt'>
                                                    <PackageSearchIcon />
                                                    <span>View Product</span>
                                                </Button>
                                            </Link>
                                            {/* <Button className='w-full flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt'>
                                                <ShoppingCartIcon />
                                                <span>Buy Again</span>
                                            </Button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default Orders