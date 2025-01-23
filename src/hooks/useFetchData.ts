import { getUserCart } from '@/app/actions/CartActions';
import { getAllOrders, getUserOrder } from '@/app/actions/OrderActions';
import { getAllCategories, getAllProducts } from '@/app/actions/ProductsAction';
import { CartType } from '@/store/cartSlice';
import { CategoryType } from '@/store/categorySlice';
import { OrderType } from '@/store/orderSlice';
import { productType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useFetchAllOrders = () => useQuery({
    queryKey: ['fetch-all-orders'],
    queryFn: async () => {
        try {
            const res = await getAllOrders();
            console.log("OrderFetch_Res", res)
            if (res.status === 200)
                return res.response as OrderType[];
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
        return null;
    }
});

export const useFetchAllProducts = () => useQuery({
    queryKey: ['fetch-all-orders'],
    queryFn: async () => {
        try {
            const res = await getAllProducts();
            console.log("OrderFetch_Res", res)
            if (res.status === 200)
                return res.response as productType[];
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
        return null;
    }
});

export const useFetchAllCategories = () => useQuery({
    queryKey: ['fetch-all-orders'],
    queryFn: async () => {
        try {
            const res = await getAllCategories();
            console.log("OrderFetch_Res", res)
            if (res.status === 200)
                return res.response as CategoryType[];
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
        return null;
    }
});

export const useFetchUserOrders = (userId: string) => useQuery({
    queryKey: ['fetch-orders'],
    queryFn: async () => {
        try {
            if (!userId) throw new Error('User ID is undefined');

            const res = await getUserOrder(userId);
            // console.log("OrderFetch_Res", res)
            if (res.status === 200)
                return res.response as OrderType[];
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
        return null;
    },
    enabled: !!userId
});

export const useFetchCart = (userId: string) => useQuery({
    queryKey: ['fetch-cart'],
    queryFn: async () => {
        try {
            if (!userId) throw new Error('User ID is undefined');

            const res = await getUserCart(userId);
            // console.log("CartFetch_Res", res)
            if (res.status === 200)
                return res.response as CartType
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
        return null;
    },
    enabled: !!userId
});
