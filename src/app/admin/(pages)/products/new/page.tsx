"use client"

import { createCategory } from '@/app/actions/AdminActions'
import Input from '@/components/CustomUI/Input'
import SubmitButton from '@/components/CustomUI/SubmitButton'
import { Button } from '@/components/ui/button'
import { CategoryType } from '@/store/categorySlice'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllCategories, getAllProducts } from '@/app/actions/ProductsAction'
import { productType } from '@/components/products/ProductSection'
import { z } from 'zod'



const NewProduct = () => {
    const [productName, setProductName] = useState<string>("")
    const [productSlug, setProductSlug] = useState<string>("")
    const [productPrice, setproductPrice] = useState<string>("")


    const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
    const [state, action, isPending] = useActionState(createCategory, undefined)
    const router = useRouter()

    const { data: categoryList } = useQuery({
        queryKey: ["fetch-category"],
        queryFn: async () => {
            try {
                const res = await getAllCategories()
                console.log("Category_res:", res)
                return res.response as CategoryType[]
            } catch (error) {
                console.error('Error fetching Category:', error);
                throw new Error('Failed to fetch Category data');
            }
        }
    })

    const { data: productList } = useQuery({
        queryKey: ["fetch-all-roducts"],
        queryFn: async () => {
            try {
                const res = await getAllProducts()
                console.log("All_Products_res:", res)
                return res.response as productType[]
            } catch (error) {
                console.error('Error fetching Products:', error);
                throw new Error('Failed to fetch Products data');
            }
        }
    })

    useEffect(() => {
        if (productSlug.length <= 0) return

        const productExists = productList?.some(product => product.productSlug.toLowerCase() === productSlug.toLowerCase())
        if (productExists) {
            setDisableSubmit(true)
            toast.error("Product Slug already Exists!")
        }
    }, [productList, productSlug])

    useEffect(() => {
        if (state?.status === 201) {
            toast.success("Category created successfully!")
            router.push("/admin/category")
        }
    }, [state?.status, router])

    const handleProductPrice = (e: React.FocusEvent<HTMLInputElement>) => {
        const currentPrice = parseInt(e.target.value, 10)
        if (currentPrice <= 0) {
            toast.error("Price cannot be ₹0")
            return
        }
    }

    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center">
                <h1 className='text-[2em] font-bold'>Add new <span className='text-primaryClr'>Product</span></h1>

                <Button className='flex_center gap-2 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"/admin/category"}>
                        <ChevronLeftIcon />
                        <span>Back</span>
                    </Link>
                </Button>
            </div>

            <form action={action} className='flex_center flex-col gap-6 max-w-[800px] p-4 mx-auto h-[90%] mt-auto'>
                <div className="w-full flex flex-col gap-3">
                    <span className='self-start text-[1.1em]'>Product Details</span>
                    <Select name='categoryId'>
                        <SelectTrigger className='relative'>
                            <span className='absolute top-[-0.9em] left-1.5 text-[0.9em] bg-background px-1 text-slate-500'>Select Product Category</span>
                            <SelectValue placeholder="Category Name" />
                        </SelectTrigger>
                        <SelectContent>
                            {categoryList?.map((item, index) =>
                                <SelectItem
                                    key={index}
                                    value={`${item.categoryID}<|>${item.categoryName}`}>
                                    {item.categoryName}
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>

                <Input
                    type='text'
                    name='productName'
                    label='Product Name'
                    placeholder='Enter Product Name'
                    setValue={setProductName}
                    required />
                <Input
                    type='text'
                    name='productSlug'
                    label='Product Slug'
                    placeholder='Enter Product Slug'
                    defaultValue={productName.toLowerCase().replaceAll(" ", "-")}
                    setValue={setProductSlug}
                    required />
                <Input
                    type='text'
                    name='title'
                    label='Short Title'
                    placeholder='Enter Product Title'
                    required />
                <Input
                    type='text'
                    name='longTitle'
                    label='Full Title'
                    placeholder='Enter Full Title'
                    required />

                <Input
                    type='text'
                    name='brand'
                    label='Product Brand'
                    placeholder='Enter Product Brand'
                    required />

                <label className={'relative border border-primaryClr_Lite sm:focus-within:border-primaryClr rounded p-1 flex flex-col w-full'}>
                    <span className='absolute top-[-0.9em] text-[0.9em] bg-background px-1 text-slate-500'>Product Description</span>
                    <textarea
                        name="description"
                        placeholder='Enter Product Description'
                        rows={4}
                        required={true}
                        className='text-[1em] bg-background text-textClr px-2 py-1 border-none outline-none resize-none disabled:text-muted-foreground' />
                </label>


                <div className="w-full flex flex-col gap-3">
                    <span className='self-start text-[1.1em]'>Product Price</span>
                    <Input
                        type='number'
                        name='currentPrice'
                        label='Maximum Retail Price'
                        placeholder='Enter Product Price (in ₹ Rupees)'
                        onBlur={handleProductPrice}
                        required />
                    <Input
                        type='number'
                        name='brand'
                        label='Product Discount'
                        placeholder='Enter Discount (in % Percentage)'
                        min={0}
                        max={100}
                        required />
                </div>

            </form>
        </section>
    )
}

export default NewProduct