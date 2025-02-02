"use client"

import { createCarouselPoster } from '@/app/actions/AdminActions'
import Input from '@/components/CustomUI/Input'
import SubmitButton from '@/components/CustomUI/SubmitButton'
import { Button } from '@/components/ui/button'
import { CategoryType } from '@/store/categorySlice'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import { CarouselType, productType } from '@/types'
import { FileState, MultiImageDropzone } from '@/app/admin/components/ImageDropZone'
import { useEdgeStore } from '@/lib/edgestore'
import { FastAverageColor } from 'fast-average-color'

type ImageUploadType = {
    imageUrl: string,
    altText: string,
    blurData: string,
    averageColor: string
}

const NewCarousel = () => {
    const [posterTitle, setPosterTitle] = useState<string>("")
    const [posterSubtitle, setPosterSubtitle] = useState<string>("")
    const [posterDescription, setPosterDescription] = useState<string>("")
    const [productUrl, setProductUrl] = useState<string>("")
    const [posterImage, setPosterImage] = useState<string>("")

    const [fileState, setFileState] = useState<FileState[]>([]);
    const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
    const { edgestore } = useEdgeStore();

    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: productList } = useQuery({
        queryKey: ["fetch-all-products"],
        queryFn: async () => {
            try {
                const res = await getAllProducts()
                // console.log("All_Products_res:", res)
                return res.response as productType[]
            } catch (error) {
                console.error('Error fetching Products:', error);
                throw new Error('Failed to fetch Products data');
            }
        }
    })

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileState((prev) => {
            return prev.map(file =>
                file.key === key ? { ...file, progress } : file
            );
        });
    }

    // Uploading File
    const uploadFiles = async () => {
        try {
            if (fileState[0]?.progress !== 'PENDING') return;

            const file = fileState[0].file instanceof File ? fileState[0].file : new File([], "")

            const res = await edgestore.publicImages.upload({
                file: file,
                onProgressChange: async (progress) => {
                    updateFileProgress(fileState[0].key, progress);
                    if (progress === 100) {
                        // wait 1 second to set it to complete
                        // so that the user can see the progress bar
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        updateFileProgress(fileState[0].key, 'COMPLETE');
                    }
                },
                options: {
                    temporary: true,
                    manualFileName: file.name,
                },
            });

            if (!res.url) {
                toast.error("Failed to Upload " + file.name)
                setFileState([])
                return
            } else {
                await edgestore.publicImages.confirmUpload({
                    url: res.url,
                });
            }

            // const averageColor = await fac.getColorAsync(res.thumbnailUrl ?? res.url);

            setPosterImage(res.url)
            toast.success("Images Uploaded Successfully!")
        } catch (err) {
            if (fileState[0]?.key) {
                updateFileProgress(fileState[0].key, 'ERROR');
            }
            toast.error("Error while uploading files")
        }
        finally {
            setIsUploadComplete(true)
        }
    }

    const { mutate: CreateNewPoster, isPending } = useMutation({
        mutationFn: async () => {
            if (!posterTitle || !posterSubtitle || !posterDescription || !productUrl || !fileState[0].file) {
                throw new Error('Missing Poster Data!');
            }

            const posterData = {
                posterTitle,
                posterSubtitle,
                posterDescription,
                productUrl,
                posterImage,
                posterSlot: 1 // Default Slot (Temporary) to be made dynamic
            }

            const res = await createCarouselPoster(posterData)
            if (res.status !== 201) {
                // console.log({ res })
                throw new Error(res.message)
            }
            return res.response as CarouselType
        },
        onSuccess: (data) => {
            if (!data) {
                // console.log(data)
                throw new Error('Product data is not available');
            }

            queryClient.invalidateQueries({ queryKey: ['fetch-all-carousel'] })
            toast.success('Product added to cart successfully')
            router.push("/admin/carousel")
        },
        onError: (error) => {
            console.log("Cart_Update_Error:", error)
            toast.error(error.message || 'Failed to add product to cart')
        }
    })

    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center">
                <h1 className='text-[2em] font-bold'>Add new <span className='text-primaryClr'>Carousel Poster</span></h1>

                <Button className='flex_center gap-2 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"/admin/carousel"}>
                        <ChevronLeftIcon />
                        <span>Back</span>
                    </Link>
                </Button>
            </div>

            <form onSubmit={() => CreateNewPoster} className='flex_center flex-col gap-6 max-w-[800px] p-4 mx-auto h-[90%] mt-auto'>
                <div className=' w-full flex_center flex-col gap-8 p-6 shadow-md mt-4 rounded-md'>
                    <Input
                        type='text'
                        name='posterTitle'
                        label='Poster Title'
                        placeholder='Enter Poster Title'
                        setValue={setPosterTitle}
                        required />

                    <Input
                        type='text'
                        name='posterSubtitle'
                        label='Poster Subtitle'
                        placeholder='Enter Poster Subtitle'
                        setValue={setPosterSubtitle}
                        required />

                    <Input
                        type='text'
                        name='posterDescription'
                        label='Poster Description'
                        placeholder='Enter Poster Description'
                        setValue={setPosterDescription}
                        required />

                    <Select name='categoryId' onValueChange={(value) => setProductUrl(value)}>
                        <SelectTrigger className='relative'>
                            <span className='absolute top-[-0.9em] left-1.5 text-[0.9em] bg-background px-1 text-slate-500'>Select Product</span>
                            <SelectValue placeholder="Product Name" />
                        </SelectTrigger>
                        <SelectContent>
                            {productList?.map((item, index) =>
                                <SelectItem
                                    key={index}
                                    value={`/product/${item.productSlug}`}>
                                    {item.longTitle}
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>

                    <MultiImageDropzone
                        className='w-full h-[100px]'
                        value={fileState}
                        dropzoneOptions={{
                            maxFiles: 1,
                            maxSize: 10485760
                        }}
                        onChange={(files) => {
                            setFileState(files);
                        }}
                        onFilesAdded={async (addedFiles) => {
                            setFileState([...fileState, ...addedFiles]);
                        }}
                        setFileStates={setFileState}
                        uploadFiles={uploadFiles}
                        disabled={isUploadComplete}
                        isUploadComplete={isUploadComplete}
                    />

                    <SubmitButton
                        text='Create Poster'
                        icon='plus'
                        pending={isPending}
                        disabled={isPending}
                        className='w-full' />
                </div>
            </form>
        </section>
    )
}

export default NewCarousel