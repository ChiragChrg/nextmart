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
import { getAllCategories } from '@/app/actions/ProductsAction'


const NewCategory = () => {
    const [categoryName, setCategoryName] = useState<string>("")
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

    useEffect(() => {
        if (categoryName.length <= 0) return

        const categoryExists = categoryList?.some(category => category.categoryName.toLowerCase() === categoryName.toLowerCase())
        if (categoryExists) {
            setDisableSubmit(true)
            toast.error("Category Name already Exists!")
        }
    }, [categoryList, categoryName])

    useEffect(() => {
        if (state?.status === 201) {
            toast.success("Category created successfully!")
            router.push("/admin/category")
        }
    }, [state?.status])

    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center">
                <h1 className='text-[2em] font-bold'>Add new <span className='text-primaryClr'>Category</span></h1>

                <Button className='flex_center gap-2 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"/admin/category"}>
                        <ChevronLeftIcon />
                        <span>Back</span>
                    </Link>
                </Button>
            </div>

            <form action={action} className='flex_center flex-col gap-6 max-w-[800px] p-4 mx-auto h-[90%] mt-auto'>
                <Tabs defaultValue="newCategory" className="w-full">
                    <TabsList className='w-full shadow bg-secondaryClr'>
                        <TabsTrigger value="newCategory" className='w-full'>New Category</TabsTrigger>
                        <TabsTrigger value="subCategory" className='w-full'>Sub Category</TabsTrigger>
                    </TabsList>
                    <TabsContent value="newCategory">
                        <div className='flex_center flex-col gap-8 p-6 shadow-md mt-4 rounded-md'>
                            <Input
                                type='text'
                                name='categoryName'
                                label='Category Name'
                                placeholder='Enter Category Name'
                                setValue={setCategoryName}
                                required />

                            <Input
                                type='text'
                                name='categorySlug'
                                label='Category Slug'
                                placeholder='Enter Category Slug'
                                defaultValue={categoryName.toLowerCase().replaceAll(" ", "-")}
                                required />

                            <Input
                                type='text'
                                name='categoryDescription'
                                label='Category Description'
                                placeholder='Enter Category Description'
                                required />

                            <SubmitButton
                                text='Create Category'
                                icon='plus'
                                pending={isPending}
                                disabled={disableSubmit}
                                className='w-full' />
                        </div>
                    </TabsContent>

                    <TabsContent value="subCategory">
                        <div className='flex_center flex-col gap-8 p-6 shadow-md mt-4 rounded-md'>
                            <Select name='parentCategoryID'>
                                <SelectTrigger className='relative'>
                                    <span className='absolute top-[-0.9em] left-1.5 text-[0.9em] bg-background px-1 text-slate-500'>Select Parent Category</span>
                                    <SelectValue placeholder="Parent Category Name" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryList?.map((item, index) => <SelectItem key={index} value={item.categoryID}>{item.categoryName}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            <Input
                                type='text'
                                name='categoryName'
                                label='Category Name'
                                placeholder='Enter Category Name'
                                setValue={setCategoryName}
                                required />

                            <Input
                                type='text'
                                name='categorySlug'
                                label='Category Slug'
                                placeholder='Enter Category Slug'
                                defaultValue={categoryName.toLowerCase().replaceAll(" ", "-")}
                                required />

                            <Input
                                type='text'
                                name='categoryDescription'
                                label='Category Description'
                                placeholder='Enter Category Description'
                                required />

                            <SubmitButton
                                text='Create Category'
                                icon='plus'
                                pending={isPending}
                                disabled={disableSubmit}
                                className='w-full' />
                        </div>
                    </TabsContent>
                </Tabs>



            </form>
        </section>
    )
}

export default NewCategory