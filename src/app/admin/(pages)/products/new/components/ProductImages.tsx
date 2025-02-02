"use client"

import { type FileState, MultiImageDropzone } from '@/app/admin/components/ImageDropZone'
import { useEdgeStore } from '@/lib/edgestore';
import { productType } from '@/types';
import React, { useState } from 'react'
import { FastAverageColor } from 'fast-average-color';
import toast from 'react-hot-toast';

type ImageUploadType = {
    imageUrl: string,
    altText: string,
    blurData: string,
    averageColor: string
}

type Props = {
    productData: productType
    updateProductData: (fields: Partial<productType>) => void
}

const ProductImages = ({ productData, updateProductData }: Props) => {
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
    const { edgestore } = useEdgeStore();
    const fac = new FastAverageColor();

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    // Uploading File
    const uploadFiles = async () => {
        let uploadMeta: ImageUploadType[] = []

        await Promise.all(
            fileStates.map(async (fileState, index) => {
                try {
                    if (fileState.progress !== 'PENDING') return;

                    const file = fileState.file instanceof File ? fileState.file : new File([], "")

                    const res = await edgestore.publicImages.upload({
                        file: file,
                        onProgressChange: async (progress) => {
                            updateFileProgress(fileState.key, progress);
                            if (progress === 100) {
                                // wait 1 second to set it to complete
                                // so that the user can see the progress bar
                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                updateFileProgress(fileState.key, 'COMPLETE');
                            }
                        },
                        options: {
                            temporary: true,
                            manualFileName: file.name,
                        },
                    });

                    if (!res.url) {
                        toast.error("Failed to Upload " + file.name)
                        setFileStates([])
                        return
                    } else {
                        await edgestore.publicImages.confirmUpload({
                            url: res.url,
                        });
                    }

                    const averageColor = await fac.getColorAsync(res.thumbnailUrl ?? res.url);

                    uploadMeta.push({
                        imageUrl: res.url,
                        altText: `Preview_${file.name.replace(/\.[^/.]+$/, "")}`,
                        blurData: res.thumbnailUrl ?? '',
                        averageColor: averageColor.hex ?? '#FFFFFF',
                    })

                    updateProductData({
                        images: [...productData.images, ...uploadMeta]
                    })

                    toast.success("Images Uploaded Successfully!")
                } catch (err) {
                    updateFileProgress(fileState.key, 'ERROR');
                    toast.error("Error while uploading files")
                }
                finally {
                    setIsUploadComplete(true)
                }
            }),
        );

    }

    return (
        <div className='flex_center flex-col w-full gap-6'>
            <span className='self-start text-[1.1em]'>Product Images</span>

            <MultiImageDropzone
                className='w-full h-[100px]'
                value={fileStates}
                dropzoneOptions={{
                    maxFiles: 6,
                    maxSize: 10485760
                }}
                onChange={(files) => {
                    setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                }}
                setFileStates={setFileStates}
                uploadFiles={uploadFiles}
                disabled={isUploadComplete}
                isUploadComplete={isUploadComplete}
            />
        </div>
    )
}

export default ProductImages