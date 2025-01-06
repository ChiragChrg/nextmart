"use client"

import { ProductTypeFlat } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { deleteProductById } from "@/app/actions/ProductsAction"
import toast from "react-hot-toast"

export const columns: ColumnDef<ProductTypeFlat>[] = [
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
        header: "Category",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "price",
        header: "Price",
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
        header: "Stock",
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
                                        // console.log(res)

                                        if (res.status === 204) {
                                            toast.success("Product Deleted Successfully!")
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
