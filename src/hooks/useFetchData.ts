import { getUserCart } from '@/app/actions/CartActions';
import { getUserOrder } from '@/app/actions/OrderActions';
import { CartType } from '@/store/cartSlice';
import { OrderType } from '@/store/orderSlice';
import { useQuery } from '@tanstack/react-query';

export const useFetchOrders = (userId: string) => useQuery({
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
