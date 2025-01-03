import { z } from "zod";

export const ProductValidation = z.object({
    productID: z
        .string()
        .nonempty({ message: "Product ID is required." }),
    productSlug: z
        .string()
        .nonempty({ message: "Product slug is required." }),
    title: z
        .string()
        .nonempty({ message: "Title is required." }),
    longTitle: z
        .string()
        .nonempty({ message: "Long title is required." }),
    description: z
        .string()
        .nonempty({ message: "Description is required." }),
    categoryId: z
        .array(z.string())
        .nonempty({ message: "Category ID is required." }),
    category: z
        .string()
        .nonempty({ message: "Category is required." }),
    brand: z
        .string()
        .nonempty({ message: "Brand is required." }),
    price: z.object({
        original: z
            .number()
            .nonnegative({ message: "Original price must be greater than Zero." }),
        current: z
            .number()
            .nonnegative({ message: "Current price must be greater than Zero." }),
        discount: z
            .number()
            .min(0, { message: "Discount must be at least 0." })
            .max(100, { message: "Discount cannot exceed 100." }),
    }),
    stock: z.object({
        quantity: z
            .number()
            .int({ message: "Stock quantity must be an integer." })
            .nonnegative({ message: "Stock quantity must be greater than Zero." }),
        isInStock: z.boolean(),
    }),
    images: z.array(
        z.object({
            imageUrl: z
                .string()
                .url({ message: "Image URL must be a valid URL." }),
            altText: z
                .string()
                .nonempty({ message: "Alt text is required and cannot be empty." }),
            blurData: z
                .string()
                .nonempty({ message: "Blur data is required and cannot be empty." }),
            averageColor: z
                .string()
                .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                    message: "Average color must be a valid hex color code.",
                }),
        })
    ),
    features: z
        .object({
            variant: z.object({
                size: z.string().nonempty({ message: "Size is required." }),
                color: z.string().nonempty({ message: "Color is required." }),
            }),
        })
        .optional(),
    variants: z
        .object({
            size: z
                .array(
                    z.object({
                        productSlug: z
                            .string()
                            .nonempty({ message: "Product slug is required." }),
                        size: z.string().nonempty({ message: "Size is required." }),
                    })
                )
                .optional(),
            color: z
                .array(
                    z.object({
                        productSlug: z
                            .string()
                            .nonempty({ message: "Product slug is required." }),
                        color: z.string().nonempty({ message: "Color is required." }),
                    })
                )
                .optional(),
        })
        .optional(),
    ratings: z.object({
        average: z
            .number()
            .min(0, { message: "Average rating must be at least 0." })
            .max(5, { message: "Average rating cannot exceed 5." }),
        reviewCount: z
            .number()
            .int({ message: "Review count must be an integer." })
            .nonnegative({ message: "Review count must be greater than Zero." }),
    }).optional(),
    tags: z
        .array(z.string())
        .nonempty({ message: "At least one tag is required." }),
});