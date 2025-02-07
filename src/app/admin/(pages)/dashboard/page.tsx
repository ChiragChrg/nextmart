import React from 'react'
import Analytics from './components/Analytics'
import { GradientChart } from './components/GradientChart'
import { useFetchAllOrders } from '@/hooks/useFetchData'
import Image from 'next/image'
import RecentOrders from './components/RecentOrders'

const Dashboard = () => {

    return (
        <section className='admin_section flex flex-col gap-4'>
            <h1 className='text-[1.5em] font-bold text-center pb-4'>Welcome Admin</h1>

            <Analytics />

            <div className="w-full flex gap-4">
                <div className="w-1/2">
                    <GradientChart />
                </div>
                <RecentOrders />
            </div>
        </section>
    )
}

export default Dashboard