"use client"

import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Input from '@/components/CustomUI/Input'
import { CategoryType } from '@/store/categorySlice'
import toast from 'react-hot-toast'
import { productType } from '@/types'

type Props = {
    productData: productType
    updateProductData: (fields: Partial<productType>) => void
    categoryList: CategoryType[] | undefined
    productList: productType[] | undefined
}

const ProductInfo = ({ productData, updateProductData, categoryList, productList }: Props) => {
    useEffect(() => {
        if (productData.productSlug.length <= 0) return

        const productExists = productList?.some(product => product.productSlug.toLowerCase() === productData.productSlug.toLowerCase())
        if (productExists) {
            // setDisableSubmit(true)
            toast.error("Product Slug already Exists!")
        }
    }, [productData, productList])

    return (
        <div className='flex_center flex-col w-full gap-6'>
            <span className='self-start text-[1.1em]'>Product Details</span>

            <Select
                name='categoryId'
                defaultValue={productData.categoryId}
                onValueChange={(value) => updateProductData({ categoryId: value })}>
                <SelectTrigger className='relative'>
                    <span className='absolute top-[-0.9em] left-1.5 text-[0.9em] bg-background px-1 text-slate-500'>Select Product Category</span>
                    <SelectValue placeholder="Category Name" />
                </SelectTrigger>
                <SelectContent>
                    {categoryList?.map((item, index) =>
                        <SelectItem
                            key={index}
                            value={item.categoryId}>
                            {item.categoryName}
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>

            <Input
                type='text'
                name='title'
                label='Product Title'
                placeholder='Enter Product Title'
                value={productData.title}
                onChange={e => {
                    updateProductData({
                        title: e.target.value,
                        longTitle: e.target.value,
                        productSlug: e.target.value?.toLowerCase().replaceAll(" ", "-")
                    })
                }}
                required />

            <Input
                type='text'
                name='longTitle'
                label='Full Title'
                defaultValue={productData.longTitle ?? productData.title}
                onChange={e => updateProductData({
                    longTitle: e.target.value,
                    productSlug: e.target.value?.toLowerCase().replaceAll(" ", "-")
                })}
                placeholder='Enter Product Full Title'
                required />

            <Input
                type='text'
                name='productSlug'
                label='Product Slug'
                placeholder='Enter Product Slug'
                defaultValue={productData.longTitle?.toLowerCase().replaceAll(" ", "-") ?? productData.title?.toLowerCase().replaceAll(" ", "-")}
                onChange={e => updateProductData({ productSlug: e.target.value?.toLowerCase().replaceAll(" ", "-") })}
                required />

            <Input
                type='text'
                name='brand'
                label='Product Brand'
                placeholder='Enter Product Brand'
                value={productData.brand}
                onChange={e => updateProductData({ brand: e.target.value })}
                required />

            <label className={'relative border border-primaryClr_Lite sm:focus-within:border-primaryClr rounded p-1 flex flex-col w-full'}>
                <span className='absolute top-[-0.9em] text-[0.9em] bg-background px-1 text-slate-500'>Product Description</span>
                <textarea
                    name="description"
                    placeholder='Enter Product Description'
                    rows={4}
                    required={true}
                    value={productData.description}
                    onChange={e => updateProductData({ description: e.target.value })}
                    className='text-[1em] bg-background text-textClr px-2 py-1 border-none outline-none resize-none disabled:text-muted-foreground' />
            </label>

            <Input
                type='text'
                name='tags'
                label='Product Tags'
                placeholder='Enter Product Tags (Separate Tags by `,` Commas)'
                value={productData.tags.join(', ')}
                onChange={e => updateProductData({ tags: e.target.value.split(",").map(tag => tag.trim()) })}
                required />
        </div>
    )
}

export default ProductInfo