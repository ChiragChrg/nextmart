"use client"

import { createProduct } from '@/app/actions/AdminActions'
import { Button } from '@/components/ui/button'
import { CategoryType } from '@/store/categorySlice'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { getAllCategories, getAllProducts } from '@/app/actions/ProductsAction'
import MultiStepForm from '@/components/Forms/MultiStepForm'
import ProductInfo from './components/ProductInfo'
import ProductPrice from './components/ProductPrice'
import ProductImages from './components/ProductImages'
import { productType } from '@/types'

const INITIAL_PRODUCT_DATA: productType = {
    productSlug: "",
    title: "",
    longTitle: "",
    description: "",
    categoryId: "",
    brand: "",
    price: {
        original: 0,
        current: 0,
        discount: 0,
    },
    stock: {
        quantity: 0,
        isInStock: false
    },
    images: [],
    features: undefined,
    variants: undefined,
    ratings: {
        average: 0,
        reviewCount: 0
    },
    tags: []
}

const NewProduct = () => {
    const [productData, setProductData] = useState<productType>(INITIAL_PRODUCT_DATA)
    const [isPending, setIsPending] = useState<boolean>(false)
    const router = useRouter()
    const queryclient = useQueryClient()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsPending(true)

        const [categoryId, _] = productData.categoryId.split("<|>")
        const formattedData = {
            ...productData,
            categoryId,
        }

        try {
            const response = await createProduct(formattedData);
            if (response.status === 201) {
                toast.success("Product created successfully!");
                queryclient.invalidateQueries({ queryKey: ["fetch-admin-products"] })
                router.push("/admin/products");
            } else {
                toast.error("Failed to create product");
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error("An error occurred while creating the product");
        } finally {
            setIsPending(false)
        }
    }

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
        queryKey: ["fetch-all-products"],
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


    const updateProductData = (fields: Partial<productType>) => {
        setProductData(prev => {
            return { ...prev, ...fields }
        })
    }

    return (
        <section className='admin_section w-full flex flex-col justify-start items-center gap-[4em]'>
            <div className="flex justify-between items-center w-full">
                <h1 className='text-[2em] font-bold'>Add new <span className='text-primaryClr'>Product</span></h1>

                <Button className='flex_center gap-2 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"/admin/category"}>
                        <ChevronLeftIcon />
                        <span>Back</span>
                    </Link>
                </Button>
            </div>

            <MultiStepForm onSubmit={handleSubmit} isPending={isPending}>
                <ProductInfo
                    productData={productData}
                    updateProductData={updateProductData}
                    categoryList={categoryList}
                    productList={productList}
                />
                <ProductPrice
                    productData={productData}
                    updateProductData={updateProductData}
                />
                <ProductImages
                    productData={productData}
                    updateProductData={updateProductData}
                />
            </MultiStepForm>
        </section>
    )
}

export default NewProduct