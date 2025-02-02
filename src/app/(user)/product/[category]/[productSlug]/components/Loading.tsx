import { RectSkeleton } from '@/components/CustomUI/Skeleton'
import React from 'react'

const Loading = () => {
    return (
        <main className='main_style mt-8 gap-8'>
            <section className="flex justify-evenly gap-10">
                {/* Left section - Product Preview images */}
                <div className="w-1/2 flex justify-center items-start gap-4">
                    <div className="flex flex-col gap-2">
                        <RectSkeleton width='80px' height='80px' />
                        <RectSkeleton width='80px' height='80px' />
                        <RectSkeleton width='80px' height='80px' />
                        <RectSkeleton width='80px' height='80px' />
                        <RectSkeleton width='80px' height='80px' />
                    </div>

                    <div className="flex_center rounded-md w-[800px] min-h-[500px] relative">
                        <RectSkeleton width='100%' height='100%' className='w-[800px] min-h-[500px]' />
                    </div>
                </div>

                {/* Right section - Product Details */}
                <div className="w-max h-full flex flex-col gap-10">
                    <RectSkeleton width='500px' height='20px' />
                    <RectSkeleton width='100%' height='30px' />

                    <div className="flex flex-col gap-2">
                        <RectSkeleton width='100%' height='50px' />
                        <RectSkeleton width='100%' height='30px' />
                        <RectSkeleton width='100%' height='40px' />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 w-[500px] gap-4 py-2">
                        <RectSkeleton width='100%' height='40px' />
                        <RectSkeleton width='100%' height='40px' />
                        <RectSkeleton width='100%' height='40px' className='sm:col-span-2' />
                    </div>
                </div>
            </section>

            {/* Product Description */}
            <section className="pt-8">
                <RectSkeleton width='200px' height='20px' />
                <br />
                <RectSkeleton width='100%' height='60px' />
                <br />
                <RectSkeleton width='100%' height='60px' />
            </section>
        </main >
    )
}

export default Loading