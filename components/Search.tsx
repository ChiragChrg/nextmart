"use client"

import { useState, useRef, FormEvent } from "react"

type SugestList = {
    name: string,
    link: string
}

type SearchProps = {
    hideSearchBtn?: boolean
}


const Search = ({ hideSearchBtn = false }: SearchProps) => {

    const [suggestionList, setSuggestionList] = useState<SugestList[] | null>(null)
    const SeachInputRef = useRef<HTMLInputElement>(null)

    const MockData = [
        {
            name: "Cat",
            link: "www.testGanjaMock.com"
        },
        {
            name: "Can",
            link: "www.testGanjaMock.com"
        },
        {
            name: "carrot",
            link: "www.testGanjaMock.com"
        },
        {
            name: "catering",
            link: "www.testGanjaMock.com"
        },
        {
            name: "fish",
            link: "www.testGanjaMock.com"
        },
        {
            name: "fire",
            link: "www.testGanjaMock.com"
        },
        {
            name: "fill",
            link: "www.testGanjaMock.com"
        },
    ]

    const GetSuggestions = (value: string) => {
        // console.log(value)
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
        const newSuggestion = MockData.filter((data) => data.name.toLowerCase().slice(0, inputLength) == inputValue)

        if (inputLength !== 0 && newSuggestion.length !== 0)
            setSuggestionList(newSuggestion)
        else
            setSuggestionList(null)
    }

    const HandleSuggestionClick = (suggestion: string) => {
        // Show results for seelcted suggestion

        if (SeachInputRef.current) {
            SeachInputRef.current.value = suggestion
        }
        setSuggestionList(null)
    }

    const HandleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Show results for seelcted suggestion

        setSuggestionList(null)
        console.log(SeachInputRef.current?.value)
    }

    return (
        <div className="bg-baseClr relative sm:min-w-[400px] max-w-[600px] w-full h-fit rounded flex gap-4 p-1 border border-secondaryClr">
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
            <form className="relative flex flex-grow flex-col bg-black" onSubmit={HandleSearch}>
                <input
                    type="text"
                    className="w-full sm:min-w-[300px] bg-baseClr p-1 px-2 outline-none"
                    onChange={(e) => GetSuggestions(e.currentTarget.value)}
                    ref={SeachInputRef}
                    placeholder="Search for Products" />

                {suggestionList && <div className="absolute bg-baseClr/25 backdrop-blur-sm w-full flex flex-col gap-2 top-11 p-2 border border-secondaryClr rounded z-10">
                    {suggestionList.map(obj => {
                        return <div
                            onClick={(e) => HandleSuggestionClick(e.currentTarget.innerText)}
                            className="bg-baseClr p-2 rounded cursor-pointer hover:bg-secondaryClr">
                            {obj.name}
                        </div>
                    })}
                </div>}
            </form>

            {/* Search Button */}
            {!hideSearchBtn && <div className="bg-primaryClr flex_center gap-2 p-1 px-2 rounded text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

                <span>Search</span>
            </div>}
        </div>
    )
}

export default Search