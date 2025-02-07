"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { getAnalytics } from "@/app/actions/AdminActions"
import { AnalyticsType } from "@/types"

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--primaryClr))",
    },
    orders: {
        label: "Orders",
        color: "hsl(var(--chart-2))",
    },
    customers: {
        label: "Customers",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export function GradientChart() {
    const { data: analytics, status } = useQuery({
        queryKey: ['fetch-analytics'],
        queryFn: async () => {
            try {
                const res = await getAnalytics();
                if (res.status === 200)
                    return res.response as AnalyticsType;
            } catch (error) {
                console.error('Error fetching Analytics:', error);
            }
            return null;
        }
    });

    if (!analytics) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue Chart</CardTitle>
                <CardDescription>
                    Showing the revenue, orders, and customers in a single chart
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={analytics.revenue.chartData.map((revenue, index) => ({
                            month: revenue.date,
                            revenue: revenue.value,
                        }))}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillCustomers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-customers)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-customers)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        {/* Revenue */}
                        <Area
                            dataKey="revenue"
                            type="natural"
                            fill="url(#fillRevenue)"
                            fillOpacity={0.4}
                            stroke="var(--color-revenue)"
                            stackId="a"
                        />

                        {/* Orders */}
                        <Area
                            dataKey="orders"
                            type="natural"
                            fill="url(#fillOrders)"
                            fillOpacity={0.4}
                            stroke="var(--color-orders)"
                            stackId="a"
                        />

                        {/* Customers */}
                        <Area
                            dataKey="customers"
                            type="natural"
                            fill="url(#fillCustomers)"
                            fillOpacity={0.4}
                            stroke="var(--color-customers)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
