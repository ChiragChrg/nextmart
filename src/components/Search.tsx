"use client"
import { useState, useRef, FormEvent } from "react"
import Fuse, { FuseResult } from 'fuse.js'
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getFlatProducts } from "@/app/actions/UserActions"
import { FlatProductType } from "@/types"
import Image from "next/image"


const Search = () => {
    const [suggestionList, setSuggestionList] = useState<FuseResult<FlatProductType>[]>([])

    const { data: FlatProductList } = useQuery({
        queryKey: ['fetch-flat-products'],
        queryFn: async () => {
            try {
                const res = await getFlatProducts();
                console.log("FlatProductFetch_Res", res)
                if (res.status === 200)
                    return res.response as FlatProductType[];
            } catch (error) {
                console.error('Error fetching FlatProducts:', error);
            }
            return null;
        }
    });


    const fuse = new Fuse(FlatProductList ?? [], {
        keys: ['title', 'productSlug'],
        shouldSort: true,
    })

    const handleUserInput = (value: string) => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
        const newSuggestion = fuse.search(inputValue)

        console.log(newSuggestion)

        if (inputLength !== 0 && newSuggestion.length !== 0)
            setSuggestionList(newSuggestion)
        else
            setSuggestionList([])
    }

    const HandleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Show results for seelcted suggestion

        setSuggestionList([])
    }

    return (
        <div className="bg-background sm:min-w-[500px] max-w-[600px] relative w-full h-fit rounded flex gap-4 p-1 border border-secondaryClr">
            {/* Category Button */}
            <div className="bg-secondaryClr text-textLiteClr flex justify-evenly items-center gap-2 rounded p-1 min-w-[80px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                </svg>

                <span>All</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

            {/* Search Input */}
            <form className="relative flex flex-grow flex-col" onSubmit={HandleSearch}>
                <input
                    type="text"
                    className="w-full sm:min-w-[300px] bg-background p-1 px-2 outline-none"
                    onChange={(e) => handleUserInput(e.currentTarget.value)}
                    placeholder="Search for Products" />

                {suggestionList.length > 0 && <div
                    onBlur={() => setSuggestionList([])}
                    className="absolute bg-secondaryClr_Alt/25 backdrop-blur-sm w-full flex flex-col gap-2 top-11 p-2 border border-primaryClr_Lite rounded z-10">
                    {suggestionList.map((product, index) => {
                        return <Link
                            key={index}
                            href={`/product/${product.item.category}/${product.item.productSlug}`}
                            onClick={() => setSuggestionList([])}
                            className="flex justify-between items-center bg-secondaryClr p-2 rounded cursor-pointer hover:bg-secondaryClr_Alt">
                            <div className="flex_center gap-4">
                                <Image
                                    src={product.item.imageUrl ?? "http://via.placeholder.com/400x400"}
                                    alt={`${product.item.title} Image`}
                                    placeholder="blur"
                                    blurDataURL={"http://via.placeholder.com/400x400"}
                                    width={50}
                                    height={50}
                                    className="rounded-md object-cover max-w-[50px] max-h-[50px]"
                                />
                                <div className='flex flex-col justify-center place-items-start'>
                                    <span className='font-bold text-[1em] capitalize'>{product.item.title}</span>
                                    <span className="capitalize text-[0.8em]">{product.item.category.replaceAll("-", " ")}</span>
                                </div>
                            </div>
                            <div className="font-sans font-bold text-[1em]">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "INR",
                                }).format(product.item.price)}</div>
                        </Link>
                    })}
                </div>}
            </form>

            {/* Search Button */}
            <div className="hidden lg:flex justify-center items-center bg-primaryClr gap-2 p-1 px-2 rounded text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

                <span className="hidden desktop:block">Search</span>
            </div>

            <div className="flex lg:hidden justify-center items-center p-1 rounded text-textClr cursor-pointer">
                {/* Just search Logo */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
        </div>
    )
}

export default Search