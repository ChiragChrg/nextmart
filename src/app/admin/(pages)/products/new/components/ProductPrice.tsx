"use client"

import Input from '@/components/CustomUI/Input'
import { productType } from '@/types'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    productData: productType
    updateProductData: (fields: Partial<productType>) => void
}

const ProductPrice = (props: Props) => {
    const { productData, updateProductData } = props
    const [currentPrice, setCurrentPrice] = useState<number>(0)

    const handleProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const originalPrice = parseInt(e.target.value, 10)
        if (originalPrice <= 0) {
            toast.error("Price cannot be ₹0")
            e.target.value = ""
            return
        }

        updateProductData({
            price: {
                original: originalPrice,
                discount: 0,
                current: 0
            }
        })
    }

    const handleProductDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const discount = parseInt(e.target.value, 10)
        if (discount > 100) {
            toast.error("Discount cannot be more than 100%")
            e.target.value = "100"
            return
        }

        const priceReduction = productData.price.original * (discount / 100)
        const discountPrice = productData.price.original - priceReduction
        setCurrentPrice(discountPrice)
        updateProductData({
            price: {
                original: productData.price.original,
                discount: discount,
                current: discountPrice
            }
        })
    }

    const handleStockUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(e.target.value, 10)
        updateProductData({
            stock: {
                quantity: quantity,
                isInStock: quantity > 0
            }
        })
    }

    useEffect(() => {
        setCurrentPrice(productData.price.current)
    }, [productData, updateProductData])

    return (
        <div className='flex_center flex-col w-full gap-6'>
            <span className='self-start text-[1.1em]'>Product Price</span>
            <Input
                type='number'
                name='originalPrice'
                label='Maximum Retail Price'
                placeholder='Enter Product Price (in ₹ Rupees)'
                defaultValue={productData.price.original > 0 ? productData.price.original.toString() : ""}
                onChange={handleProductPrice}
                required />

            <Input
                type='number'
                name='discountPercentage'
                label='Product Discount'
                placeholder='Enter Discount (in % Percentage)'
                min={0}
                max={100}
                defaultValue={productData.price.discount > 0 ? productData.price.discount.toString() : ""}
                onChange={handleProductDiscount}
                required />

            <Input
                type='number'
                name='currentPrice'
                label='Offer Price'
                disabled={true}
                defaultValue={productData.price.current > 0 ? productData.price.current.toString() : ""}
                required />

            <Input
                type='number'
                name='stockQuantity'
                label='Stock Quantity'
                min={0}
                defaultValue={productData.stock.quantity > 0 ? productData.stock.quantity.toString() : ""}
                onChange={handleStockUpdate}
                required />
        </div>
    )
}

export default ProductPrice