"use client"

import { cn } from "@/lib/utils"
import { RootState } from "@/store"
import { MinusIcon, PlusIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUserCart } from "@/app/actions/CartActions"
import { cartActions, CartType } from "@/store/cartSlice"
import { useHandleRemoveCartItem } from "@/hooks/useCart"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetDescription
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useFetchCart } from "@/hooks/useFetchData"

type Props = {
    className?: string,
    showText?: boolean
}

const Cart = ({ className = "", showText = false }: Props) => {
    const [cartCount, setCartCount] = useState<number>(0)
    const [showCart, setShowCart] = useState<boolean>(false)

    const { user } = useSelector((state: RootState) => state.user)
    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()
    const handleRemoveCartItem = useHandleRemoveCartItem()

    useEffect(() => {
        setCartCount(cart.items.length)
    }, [cart])

    const { data: cartData, status: cartFetchStatus } = useFetchCart(user?.id as string)

    useEffect(() => {
        if (cartFetchStatus === "success" && cartData) {
            dispatch(cartActions.updateCart(cartData));
        }
    }, [cartData, cartFetchStatus, dispatch])

    return (
        <Sheet open={showCart} onOpenChange={setShowCart}>
            <SheetTrigger asChild>
                <Button variant={"secondary"} size={"icon"} className={cn(`relative flex_center flex-col bg-secondaryClr hover:bg-secondaryClr_Alt cursor-pointer rounded-full w-12 h-12`, className)}>
                    {cartCount > 0 &&
                        <div className="absolute top-1 right-1 flex_center bg-primaryClr text-white w-5 h-5 text-center rounded-full text-[0.8em] pt-[1px]">
                            <span>{cartCount}</span>
                        </div>
                    }

                    <ShoppingCartIcon />

                    {showText && <span className="text-[0.8em]">Cart</span>}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Cart ({cartCount})</SheetTitle>
                    <SheetDescription className="hidden"></SheetDescription>
                </SheetHeader>

                <div className="w-full h-full max-h-[80dvh] my-4 pr-2 overflow-y-auto">
                    {cart?.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center gap-4 py-4 border-t border-secondaryClr">
                            <Link href={`product/${item.product?.category?.categorySlug}/${item.product?.productSlug}`} className="flex_center gap-4">
                                <Image
                                    src={item.product?.images[0]?.imageUrl ?? "http://via.placeholder.com/400x400"}
                                    alt={item.product?.images[0]?.altText ?? "Product_Image"}
                                    placeholder="blur"
                                    blurDataURL={item.product?.images[0]?.blurData ?? "http://via.placeholder.com/400x400"}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                />

                                <div className="flex justify-center items-start flex-col">
                                    <span className="font-bold overflow-ellipsis">{item.product?.title}</span>
                                    <div>
                                        <span className="font-sans">{new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        }).format(item.unitRate)}</span>
                                        <span className="p-4 select-none min-w-14 text-center">x {item.quantity}</span>
                                    </div>
                                </div>
                            </Link>

                            <span className="font-sans font-bold">{new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "INR",
                            }).format(item.price)}</span>

                            <Button onClick={() => user.id && handleRemoveCartItem({ productId: item.productId, userId: user.id })} variant={"destructive"} size={"icon"}>
                                <Trash2Icon />
                            </Button>
                        </div>
                    ))}
                </div>

                <SheetFooter className="w-full flex !justify-between items-center gap-4 p-4 border-t border-secondaryClr">
                    <div className="flex_center flex-col">
                        <span>Grand Total</span>
                        <span className="font-sans font-bold text-[1.4em]">{new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "INR",
                        }).format(cart?.totalAmount ?? 0)}</span>
                    </div>

                    <Button
                        className="flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt"
                        onClick={() => setShowCart(false)}
                        asChild>
                        <Link href={"/checkout"}>
                            <ShoppingCartIcon />
                            <span className="text-[1.1em]">Proceed to Checkout</span>
                        </Link>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart