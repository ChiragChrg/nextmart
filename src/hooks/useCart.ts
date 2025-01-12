"use client"

import { removeItemFromCart } from "@/app/actions/CartActions"
import { cartActions } from "@/store/cartSlice"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useCallback } from "react"

export const useHandleRemoveCartItem = () => {
    const dispatch = useDispatch()

    return useCallback(async ({ productId, userId }: { productId: string, userId: string }) => {
        try {
            const res = await removeItemFromCart(userId, productId)
            if (res.status === 204) {
                toast.success("Item removed from cart!")
                dispatch(cartActions.removeItem(productId))
            }
        } catch (error) {
            console.log("Cart_Item_Remove_Error : ", error)
            toast.error("Failed to remove cart item")
        }
    }, [dispatch])
}