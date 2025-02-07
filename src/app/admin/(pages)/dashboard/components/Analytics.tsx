"use client"
import React from 'react'
import CountUp from 'react-countup'
import { Area, AreaChart } from "recharts"

import {
    ChartConfig,
    ChartContainer
} from "@/components/ui/chart"
import { BadgeIndianRupeeIcon, HandCoinsIcon, Package, TrendingDownIcon, TrendingUpIcon, UsersIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getAnalytics } from '@/app/actions/AdminActions'
import { AnalyticsType } from '@/types'
import { cn } from '@/lib/utils'

const Analytics: React.FC = () => {
    const { data: analytics, status } = useQuery({
        queryKey: ['fetch-analytics'],
        queryFn: async () => {
            try {
                const res = await getAnalytics();
                // console.log("AnalyticsFetch_Res", res)
                if (res.status === 200)
                    return res.response as AnalyticsType;
            } catch (error) {
                console.error('Error fetching Analytics:', error);
            }
            return null;
        }
    });



    return <div className='w-full flex justify-center gap-8 px-8'>
        {/* Orders Card */}
        <div className="flex justify-between items-center gap-6 border p-4 rounded-md w-full min-w-[300px] overflow-hidden">
            <div className="flex flex-col gap-2 w-full min-w-[110px]">
                <div className="flex items-center gap-2">
                    <Package />
                    <span className='text-[1.2em] font-bold'>Orders</span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>This Month</span>
                    <span className='text-[1.5em] font-bold'>
                        <CountUp
                            end={analytics?.orders.thisMonth ?? 0}
                            duration={2} />
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>Total Orders</span>
                    <span className='text-[1.125em] font-bold'>{analytics?.orders.totalOrders.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex items-center flex-col gap-2 w-full h-full">
                <GradientChart chartData={analytics?.orders.chartData ?? []} label='Orders' color='dodgerblue' />
                <div className={cn("flex_center gap-2 bg-green-100 rounded-md p-1", (analytics?.orders.percentage ?? 0) > 0 ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100')}>
                    {(analytics?.orders.percentage ?? 0) > 0
                        ? <TrendingUpIcon />
                        : <TrendingDownIcon />
                    }
                    <span>{analytics?.orders.percentage ?? 0}%</span>
                </div>
            </div>
        </div>

        {/* Revenue Card */}
        <div className="flex justify-between items-center gap-6 border p-4 rounded-md w-full min-w-[300px] overflow-hidden">
            <div className="flex flex-col gap-2 w-full min-w-[110px]">
                <div className="flex items-center gap-2">
                    <HandCoinsIcon />
                    <span className='text-[1.2em] font-bold'>Revenue</span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>This Month</span>
                    <span className='text-[1.5em] font-bold'>
                        <CountUp
                            prefix="₹"
                            end={analytics?.revenue.thisMonth ?? 0}
                            duration={2} />
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>Total Revenue</span>
                    <span className='text-[1.125em] font-bold'>₹{analytics?.revenue.totalRevenue.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex items-center flex-col gap-2 w-full h-full">
                <GradientChart chartData={analytics?.revenue.chartData ?? []} label='Revenue' color='limegreen' />
                <div className={cn("flex_center gap-2 bg-green-100 rounded-md p-1", (analytics?.revenue.percentage ?? 0) > 0 ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100')}>
                    {(analytics?.revenue.percentage ?? 0) > 0
                        ? <TrendingUpIcon />
                        : <TrendingDownIcon />
                    }
                    <span>{analytics?.revenue.percentage ?? 0}%</span>
                </div>
            </div>
        </div>

        {/* Income Card */}
        <div className="flex justify-between items-center gap-6 border p-4 rounded-md w-full min-w-[300px] overflow-hidden">
            <div className="flex flex-col gap-2 w-full min-w-[110px]">
                <div className="flex items-center gap-2">
                    <BadgeIndianRupeeIcon />
                    <span className='text-[1.2em] font-bold'>Income</span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>This Month</span>
                    <span className='text-[1.5em] font-bold'>
                        <CountUp
                            prefix="₹"
                            end={analytics?.income.thisMonth ?? 0}
                            duration={2} />
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>Total Income</span>
                    <span className='text-[1.125em] font-bold'>₹{analytics?.income.totalIncome.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex items-center flex-col gap-2 w-full h-full">
                <GradientChart chartData={analytics?.income.chartData ?? []} label='Income' color='limegreen' />
                <div className={cn("flex_center gap-2 bg-green-100 rounded-md p-1", (analytics?.income.percentage ?? 0) > 0 ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100')}>
                    {(analytics?.income.percentage ?? 0) > 0
                        ? <TrendingUpIcon />
                        : <TrendingDownIcon />
                    }
                    <span>{analytics?.income.percentage ?? 0}%</span>
                </div>
            </div>
        </div>

        {/* Customers Card */}
        <div className="flex justify-between items-center gap-6 border p-4 rounded-md w-full min-w-[300px] overflow-hidden">
            <div className="flex flex-col gap-2 w-full min-w-[110px]">
                <div className="flex items-center gap-2">
                    <UsersIcon />
                    <span className='text-[1.2em] font-bold'>Customers</span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>This Month</span>
                    <span className='text-[1.5em] font-bold'>
                        <CountUp
                            end={analytics?.customers.thisMonth ?? 0}
                            duration={2} />
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className='text-[0.8em]'>Total Customers</span>
                    <span className='text-[1.125em] font-bold'>{analytics?.customers.totalCustomers.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex items-center flex-col gap-2 w-full h-full">
                <GradientChart chartData={analytics?.customers.chartData ?? []} label='Customers' color='dodgerblue' />
                <div className={cn("flex_center gap-2 bg-green-100 rounded-md p-1", (analytics?.customers.percentage ?? 0) > 0 ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100')}>
                    {(analytics?.customers.percentage ?? 0) > 0
                        ? <TrendingUpIcon />
                        : <TrendingDownIcon />
                    }
                    <span>{analytics?.customers.percentage ?? 0}%</span>
                </div>
            </div>
        </div>
    </div>
}

//#region Chart Generator
type GradientChartProps = {
    chartData: { date: string, value: number }[],
    label: string,
    color: string
}

export function GradientChart({ chartData, label, color }: GradientChartProps) {
    return (
        <div className="w-full h-full max-w-[200px] relative">
            <ChartContainer className="w-full h-full absolute" config={{
                value: {
                    label,
                    color
                }
            }}>
                <AreaChart
                    accessibilityLayer
                    data={chartData}
                >
                    <defs>
                        <linearGradient id={`fill-${label}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-value)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-value)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    <Area
                        dataKey="value"
                        type="basis"
                        fill={`url(#fill-${label})`}
                        fillOpacity={0.6}
                        stroke="var(--color-value)"
                        stackId="a"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}

export default Analytics