"use client"

import { Button } from '@/components/ui/button'
import { PackagePlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { deleteProductById, getAllProducts } from '@/app/actions/ProductsAction'
import { productType, ProductTypeFlat } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { ArrowUpDown, MoreHorizontal, Trash2Icon } from "lucide-react"
import toast from 'react-hot-toast'
import { useEdgeStore } from '@/lib/edgestore'

const Products = () => {
    const queryclient = useQueryClient()
    const { edgestore } = useEdgeStore()

    const { data: productData } = useQuery({
        queryKey: ["fetch-admin-products"],
        queryFn: async () => {
            try {

                const res = await getAllProducts()
                // console.log("CartFetch_Res", res)
                return res.response as productType[]
            } catch (error) {
                console.error('Error fetching Cart:', error);
                throw new Error('Failed to fetch Cart data');
            }
        },
    })

    const formattedData: ProductTypeFlat[] = productData?.map(product => ({
        productId: product.productId,
        image: product.images[0],
        title: product.title,
        category: product?.category?.categoryName ?? "",
        brand: product.brand,
        price: product.price.current,
        stock: product.stock.quantity,
        productPath: `/product/${product.category?.categorySlug}/${product.productSlug}`
    })) ?? []

    const columns: ColumnDef<ProductTypeFlat>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "image",
            header: "Product Image",
            cell: ({ row }) => {
                const { image } = row.original
                return (
                    <Image
                        src={image?.imageUrl ?? "http://via.placeholder.com/400x400"}
                        alt={image?.altText ?? "Product_Image"}
                        placeholder="blur"
                        blurDataURL={image?.blurData ?? "http://via.placeholder.com/400x400"}
                        width={100}
                        height={100}
                        className="rounded-md"
                    />
                )
            },
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Product Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "category",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "brand",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Brand
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                }).format(amount)

                return formatted
            },
        },
        {
            accessorKey: "stock",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Stock
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const product = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link href={product.productPath} target="_blank">
                                    View Product
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button
                                    variant={"destructive"}
                                    className="flex_center gap-2 text-[0.9em] hover:bg-red-600"
                                    onClick={async () => {
                                        try {
                                            if (!product.productId) {
                                                toast.error("Product Id not found")
                                                return
                                            }

                                            const res = await deleteProductById(product.productId)
                                            console.log(res)

                                            if (res.status === 204) {
                                                const deletedProduct = await res.response as productType
                                                console.log({ deletedProduct })

                                                deletedProduct.images.forEach(async image => {
                                                    // Delteing images from edgeStore
                                                    const deleteRes = await edgestore.publicImages.delete({ url: image.imageUrl })
                                                    console.log({ image, deleteRes, deletedProduct })
                                                })

                                                toast.success("Product Deleted Successfully!")
                                                queryclient.invalidateQueries({ queryKey: ["fetch-admin-products"] })
                                            }
                                        } catch (error) {
                                            console.error('Error deleting product:', error);
                                        }
                                    }}
                                >
                                    <Trash2Icon size={20} />
                                    <span>Remove Product</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu >
                )
            },
        },
    ]

    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center mb-4">
                <h1 className='text-[2em] font-bold'>Products</h1>

                <Button className='flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"products/new"}>
                        <PackagePlusIcon />
                        <span>New Product</span>
                    </Link>
                </Button>
            </div>

            <DataTable columns={columns} data={formattedData} />
        </section>
    )
}

export default Products