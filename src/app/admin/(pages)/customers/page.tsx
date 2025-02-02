"use client"
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
import { ArrowUpDown, MoreHorizontal, Trash2Icon, User2Icon } from "lucide-react"
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '@/app/actions/AdminActions'
import { UserType } from '@/store/userSlice'
import { CustomerTableType } from '@/types'
import { DataTable } from '@/components/ui/data-table'

const Customers = () => {
    const { data: customers, status: customerStatus } = useQuery({
        queryKey: ['fetch-customers'],
        queryFn: async () => {
            try {
                const res = await getCustomers();
                // console.log("CustomersFetch_Res", res)
                if (res.status === 200)
                    return res.response as UserType[];
            } catch (error) {
                console.error('Error fetching Customers:', error);
            }
            return null;
        }
    });

    const formattedData: CustomerTableType[] = customers?.map(customer => ({
        id: customer.id ?? '',
        name: customer.name ?? '',
        email: customer.email ?? '',
        emailVerified: customer.emailVerified ?? false,
        image: customer.image ?? '',
        createdAt: customer.createdAt ?? '',
    })) ?? []

    const columns: ColumnDef<CustomerTableType>[] = [
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
            header: "User Picture",
            cell: ({ row }) => {
                const { image } = row.original

                return (
                    <div className="flex_center bg-primaryClr aspect-square text-white rounded-full w-[40px] h-[40px] relative overflow-hidden">
                        {
                            image ?
                                <Image src={image} alt="ProfileImage" fill={true} className='object-cover' />
                                :
                                <User2Icon className="w-full" />
                        }
                    </div>
                )
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Customer Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "emailVerified",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email Verified
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "registerDate",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Registered On
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const { createdAt } = row.original

                return new Date(createdAt).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
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
            <h1 className='text-[2em] font-bold'>Customers</h1>

            <DataTable columns={columns} data={formattedData} filterColumn='email' filterPlaceholder='Search Email...' />
        </section>
    )
}

export default Customers