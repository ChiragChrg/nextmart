import { CategoryType } from "@/store/categorySlice"

//#region Product Types
export type productType = {
    productId?: string,
    productSlug: string,
    title: string,
    longTitle: string,
    description: string,
    categoryId: string,
    category?: CategoryType,
    brand: string,
    price: {
        original: number,
        current: number,
        discount: number,
    },
    stock: {
        quantity: number,
        isInStock: boolean
    }
    images: {
        imageUrl: string,
        altText: string,
        blurData: string,
        averageColor: string
    }[],
    features?: {
        variant: {
            size: string,
            color: string,
        }
    },
    variants?: {
        size?: {
            productSlug: string,
            size: string
        }[],
        color?: {
            productSlug: string,
            color: string
        }[]
    }
    ratings?: {
        average: number,
        reviewCount: number
    },
    tags: string[]
}

// Product type for the product table
export type ProductTableType = {
    productId?: string;
    image: {
        imageUrl: string,
        altText: string,
        blurData: string,
        averageColor: string
    };
    title: string;
    category: string;
    stock: number;
    productPath: string;
}

// Product type for the search suggestions
export type FlatProductType = {
    productId?: string,
    productSlug: string,
    title: string,
    category: string,
    price: number,
    imageUrl: string
}
//#endregion Product Types

//#region Order Types
export type OrderTableType = {
    orderId: string;
    razorpayId: string;
    orderDate: string;
    status: string;
    totalAmount: number;
}
//#endregion Order Types

//#region Admin Page Types
export type CustomerTableType = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
}

export type CarouselType = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    poster: string;
    productUrl: string;
    status: "active" | "inactive";
}

export type AnalyticsType = {
    orders: {
        totalOrders: number;
        thisMonth: number;
        percentage: number;
        chartData: { date: string; value: number }[];
    },
    revenue: {
        totalRevenue: number;
        thisMonth: number;
        percentage: number;
        chartData: { date: string; value: number }[];
    },
    income: {
        totalIncome: number;
        thisMonth: number;
        percentage: number;
        chartData: { date: string; value: number }[];
    },
    customers: {
        totalCustomers: number;
        thisMonth: number;
        percentage: number;
        chartData: { date: string; value: number }[];
    }
}
//#endregion Admin Page Types