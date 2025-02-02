"use client"

import { DataTable } from '@/components/ui/data-table'
import { useFetchAllOrders } from '@/hooks/useFetchData'
import { OrderTableType } from '@/types'
import React from 'react'

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
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Orders = () => {
    const { data: orders, status: orderStatus } = useFetchAllOrders()

    const formattedData: OrderTableType[] = orders?.map(order => ({
        orderId: order.orderId ?? '',
        razorpayId: order.razorpayOrderId,
        orderDate: order.createdAt ?? '',
        status: order.status,
        totalAmount: order.totalAmount
    })) ?? []

    const columns: ColumnDef<OrderTableType>[] = [
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
            accessorKey: "orderId",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Order ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "razorpayId",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        RazorPay ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "orderDate",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Ordered On
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const date = Date.parse(row.getValue("orderDate"))

                return new Date(date).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "totalAmount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Total Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("totalAmount"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                }).format(amount)

                return formatted
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
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
                                <Link href={""} target="_blank">
                                    View Product
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button
                                    variant={"destructive"}
                                    className="flex_center gap-2 text-[0.9em] hover:bg-red-600"
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
            <h1 className='text-[2em] font-bold'>Orders</h1>

            <DataTable columns={columns} data={formattedData} filterColumn='orderId' filterPlaceholder='Search Orders ID...' />
        </section>
    )
}

export default Orders