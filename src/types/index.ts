export type productType = {
    productId: string
    productSlug: string
    title: string,
    longTitle: string,
    description: string,
    categoryId: string,
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