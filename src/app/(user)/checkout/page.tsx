"use client"
import { RootState } from '@/store'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { CreditCardIcon, MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { createOrder } from '@/app/actions/OrderActions'
import { useHandleRemoveCartItem } from '@/hooks/useCart'
import { useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { cartActions, CartType } from '@/store/cartSlice'
import { updateCartItems } from '@/app/actions/CartActions'

// Declare Razorpay on the window object
declare global {
    interface Window {
        Razorpay: any;
    }
}

type OrderResponseType = {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}



const Checkout = () => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [updatedProductQuantity, setUpdatedProductQuantity] = useState<string[]>([])

    const cart = useSelector((state: RootState) => state.cart)
    const { user } = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()
    const handleRemoveCartItem = useHandleRemoveCartItem()
    const queryClient = useQueryClient()

    const updateOrder = async ({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
    }: OrderResponseType, cartId: string) => {
        try {
            const orderParams = {
                cartId,
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature,
            }
            const res = await createOrder(orderParams)
            console.log("Create_Order_Res:", res)

            if (res.status === 201) {
                await queryClient.invalidateQueries({ queryKey: ['fetch-cart'] })
                dispatch(cartActions.clearCart())
                router.push("/orders")
            } else {
                toast.error("Something went Wrong. Try Again Later!")
            }
        } catch (error) {
            console.log("Create_Order_Error : ", error)
            toast.error("Failed to Update Order")
        }
    }

    const createOrderId = async () => {
        try {
            const res = await fetch('/api/payment/createOrderId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: cart.totalAmount * 100,
                    currency: "INR",
                    receipt: `${user.name}_${cart.cartId}`,
                })
            });
            console.log("Payment_OrderID_Res", res)
            const data = await res.json();

            if (data.status !== 201) {
                throw new Error('Failed to Generate RazorPay OrderID');
            }

            return data.orderId;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handlePayment = async () => {
        await queryClient.invalidateQueries({ queryKey: ['fetch-cart'] })

        if (cart.items.length <= 0) {
            toast.error("Cart is Empty")
            return
        }

        try {
            setIsPending(true)

            cart.items.forEach((item) => {
                if (!item.product?.stock.isInStock) {
                    throw new Error(item.product?.title + " is Out of Stock!");
                }
            })

            const orderId: string = await createOrderId();

            if (!orderId) {
                throw new Error('Failed to place order');
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: cart.totalAmount * 100,
                currency: "INR",
                name: 'NEXT MART',
                description: cart.items.reduce((acc, curr) => acc + `${curr.product?.title}, `, ""),
                order_id: orderId,
                handler: async function (response: any) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await fetch('/api/payment/verifyPayment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
                    const res = await result.json();
                    console.log("Payment_Verify_Res", res)

                    if (res.status === 200) {
                        if (cart.cartId) {
                            await updateOrder(data, cart.cartId)
                        } else {
                            toast.error("Cart ID is missing")
                        }
                        toast.success("Payment Completed!");
                    } else
                        toast.error(res.message);

                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: '#2463eb',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function (response: any) {
                toast.error(response.error.description);
            });
            razorpay.open();
        } catch (error) {
            console.log(error);
            toast.error("Payemt_Error:" + error)
        } finally {
            setIsPending(false)
        }
    }

    const updateUserCart = async () => {
        try {
            const res = await updateCartItems(cart)
            console.log("UpdateCart_Res", res)

            if (res.status !== 200) {
                throw new Error('Failed to Generate RazorPay OrderID');
            }

            const cartRes = res.response as CartType

            setUpdatedProductQuantity([])
            dispatch(cartActions.updateCart(cartRes))
        } catch (error) {
            console.error('Update_Cart_Error:', error);
        }
    }

    return (
        <>
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
                                    <TableHead className="w-[200px] text-center">Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="w-[100px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item, index) => {
                                    const isInStock = item.product?.stock.isInStock
                                    const isQuantityUpdated = updatedProductQuantity.includes(item.productId)

                                    return <TableRow key={index} className={cn(!isInStock && "bg-red-500/20 hover:bg-red-500/40")}>
                                        <TableCell className="font-medium">
                                            <Image
                                                src={item.product?.images[0]?.imageUrl ?? "http://via.placeholder.com/400x400"}
                                                alt={item.product?.images[0]?.altText ?? "Product_Image"}
                                                placeholder="blur"
                                                blurDataURL={item.product?.images[0]?.blurData ?? "http://via.placeholder.com/400x400"}
                                                width={150}
                                                height={150}
                                                className="object-cover rounded-md"
                                            />
                                        </TableCell>
                                        <TableCell className='flex flex-col justify-center'>
                                            <span className='font-bold text-[1em]'>{item.product?.longTitle}</span>
                                            <span>{item.product?.description}</span>
                                        </TableCell>
                                        <TableCell className="font-sans font-bold text-[1em]">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "INR",
                                            }).format(item.unitRate)}</TableCell>
                                        {/* <TableCell>x {item.quantity}</TableCell> */}
                                        <TableCell>
                                            <div className="flex justify-center items-center">
                                                <Button
                                                    variant="outline"
                                                    size={'icon'}
                                                    onClick={() => {
                                                        setUpdatedProductQuantity(prev => [...prev, item.productId])
                                                        dispatch(cartActions.decrementQuantity(item.productId))
                                                    }}
                                                    className="bg-background border-primaryClr font-bold w-8 h-8"
                                                >
                                                    <MinusIcon size={20} />
                                                </Button>

                                                <span className="p-4 select-none min-w-14 text-center">{item.quantity}</span>

                                                <Button
                                                    variant="outline"
                                                    size={'icon'}
                                                    onClick={() => {
                                                        setUpdatedProductQuantity(prev => [...prev, item.productId])
                                                        dispatch(cartActions.incrementQuantity(item.productId))
                                                    }}
                                                    className="bg-background border-primaryClr font-bold w-8 h-8"
                                                >
                                                    <PlusIcon size={20} />
                                                </Button>
                                            </div>

                                            {isQuantityUpdated && <Button
                                                variant={'secondary'}
                                                onClick={updateUserCart}
                                                className='w-full bg-secondaryClr_Alt border border-primaryClr'>
                                                Update
                                            </Button>}
                                        </TableCell>
                                        <TableCell className="font-sans font-bold text-[1em] text-right">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "INR",
                                            }).format(item.price)}</TableCell>
                                        <TableCell className='relative'>
                                            <div className="w-[2px] h-[80%] bg-secondaryClr_Alt my-auto"></div>
                                            <Button
                                                onClick={() => user.id && handleRemoveCartItem({ productId: item.productId, userId: user.id })}
                                                variant={"destructive"}
                                                size={"icon"}
                                                className={cn(isInStock && "bg-background hover:bg-red-500/10 border-2 border-red-500 text-red-500")}>
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

                        <Button onClick={handlePayment} disabled={isPending} className='flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt w-full mt-8'>
                            <CreditCardIcon />
                            <span>Proceed to Pay</span>
                        </Button>
                    </div>

                </div>
            </main >

            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                async
                defer
            />
        </>
    )
}

export default Checkout