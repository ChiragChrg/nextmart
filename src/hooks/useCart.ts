"use client"

import { addToCart, removeItemFromCart } from "@/app/actions/CartActions"
import { cartActions, CartType } from "@/store/cartSlice"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productType } from "@/types"

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

export const useAddToCart = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ productData, userId, quantity }: { productData: productType, userId: string, quantity: number }) => {
            if (!productData) {
                throw new Error('Product data is not available');
            }

            if (!userId) {
                throw new Error('User ID is not available');
            }

            const flatProductData = {
                userId,
                productId: productData.productId!,
                quantity: quantity,
            }
            const res = await addToCart(flatProductData)
            if (res.status !== 201) {
                // console.log({ res })
                throw new Error(res.message)
            }
            return res.response as CartType
        },
        onSuccess: (data) => {
            if (!data) {
                // console.log(data)
                throw new Error('Product data is not available');
            }

            //   setExistsInCart(true)

            // Update Cart Redux store
            dispatch(cartActions.updateCart(data))

            queryClient.invalidateQueries({ queryKey: ['cart'] })
            toast.success('Product added to cart successfully')
        },
        onError: (error) => {
            console.log("Cart_Update_Error:", error)
            toast.error(error.message || 'Failed to add product to cart')
        }
    })
}