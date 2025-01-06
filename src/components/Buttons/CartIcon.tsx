"use client"

import { cn } from "@/lib/utils"
import { RootState } from "@/store"
import { ShoppingCartIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUserCart } from "@/app/actions/UserActions"
import { cartActions, CartType } from "@/store/cartSlice"

type Props = {
    width?: string,
    height?: string,
    className?: string,
    showText?: boolean
}

const CartIcon = ({ width = "100%", height = "100%", className = "", showText = false }: Props) => {
    const cartCount = useSelector((state: RootState) => state.cart.items.length)
    const { user } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch()

    const { data: cartData, status: cartFetchStatus } = useQuery({
        queryKey: ["fetch-cart"],
        queryFn: async () => {
            try {
                if (!user.id) throw new Error('User ID is undefined');

                const res = await getUserCart(user.id);
                console.log("CartFetch_Res", res)
                return res.response as CartType
            } catch (error) {
                console.error('Error fetching Cart:', error);
                throw new Error('Failed to fetch Cart data');
            }
        },
        enabled: !!user?.id
    })

    useEffect(() => {
        if (cartFetchStatus === "success") {
            const cartItems = cartData.items.map(item => ({
                productId: item.productId,
                product: item.product,
                quantity: item.quantity,
                unitRate: item.unitRate,
                price: item.price
            }));

            cartItems.forEach(item => dispatch(cartActions.updateCart(item)));
        }
    }, [cartData, cartFetchStatus, dispatch])

    return (
        <Button variant={"secondary"} size={"icon"} className={cn(`relative flex_center flex-col bg-secondaryClr hover:bg-secondaryClr_Alt cursor-pointer rounded-full w-12 h-12`, className)}>
            {cartCount > 0 &&
                <div className="absolute top-1 right-1 flex_center bg-primaryClr text-white w-5 h-5 text-center rounded-full text-[0.8em] pt-[1px]">
                    <span>{cartCount}</span>
                </div>
            }

            <ShoppingCartIcon />

            {showText && <span className="text-[0.8em]">Cart</span>}
        </Button>
    )
}

export default CartIcon