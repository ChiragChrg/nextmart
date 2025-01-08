"use client"
import { RootState } from '@/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { CreditCardIcon, Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const Checkout = () => {
    const cart = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.user)
    const router = useRouter()

    const handleRemoveCartItem = async (productId: string) => {
        // try {
        //     const userId = user.id as string
        //     const res = await removeItemFromCart(userId, productId)
        //     if (res.status === 204) {
        toast.success("Item removed from cart!")
        //         dispatch(cartActions.removeItem(productId))
        //     }
        // } catch (error) {
        //     console.log("Cart_Item_Remove_Error : ", error)
        //     toast.error("Failed to remove cart item")
        // }
    }


    return (
        <main className='main_style mt-4 relative'>
            <h1 className='font-bold text-[2rem]'>Checkout Summary</h1>

            <div className="flex justify-between items-start gap-4 min-h-full">
                <div className="flex_center flex-col w-2/3 h-full">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[160px]"></TableHead>
                                <TableHead className="w-[400px]">Product Details</TableHead>
                                <TableHead>Unit Rate</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.items.map((item, index) => {
                                return <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <Image
                                            src={item.product.images[0]?.imageUrl ?? "http://via.placeholder.com/400x400"}
                                            alt={item.product.images[0]?.altText ?? "Product_Image"}
                                            placeholder="blur"
                                            blurDataURL={item.product.images[0]?.blurData ?? "http://via.placeholder.com/400x400"}
                                            width={150}
                                            height={150}
                                            className="object-cover rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell className='flex flex-col justify-center'>
                                        <span className='font-bold text-[1em]'>{item.product.longTitle}</span>
                                        <span>{item.product.description}</span>
                                    </TableCell>
                                    <TableCell className="font-sans font-bold text-[1em]">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        }).format(item.unitRate)}</TableCell>
                                    <TableCell>x {item.quantity}</TableCell>
                                    <TableCell className="font-sans font-bold text-[1em] text-right">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        }).format(item.price)}</TableCell>
                                    <TableCell className='relative'>
                                        <div className="w-[2px] h-[80%] bg-secondaryClr_Alt my-auto"></div>
                                        <Button onClick={() => handleRemoveCartItem(item.productId)} variant={"destructive"} size={"icon"}>
                                            <Trash2Icon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {cart.totalAmount ?
                        <div className="w-full text-right mr-[13em]">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "INR",
                            }).format(cart.totalAmount)}
                        </div>
                        :
                        <div className="w-full text-center mt-8 text-muted-foreground">
                            Cart is Empty
                        </div>
                    }
                </div>
                <div className="w-1/3 bg-secondaryClr p-4 rounded-md">
                    <h2 className='font-bold text-[1.8rem]'>Grand Total</h2>

                    <div className="text-right font-sans font-bold text-[1.4em]">{new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "INR",
                    }).format(cart?.totalAmount ?? 0)}
                    </div>

                    <Button className='flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt w-full mt-8'>
                        <CreditCardIcon />
                        <span>Proceed to Pay</span>
                    </Button>
                </div>

            </div>
        </main>
    )
}

export default Checkout