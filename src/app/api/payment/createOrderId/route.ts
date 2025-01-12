import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

type RazorOrderType = {
    amount: string;
    currency: string;
    orderId: string;
};

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const { amount, currency, orderId } = (await request.json()) as RazorOrderType;

        const options = {
            amount: amount,
            currency: currency,
            receipt: orderId,
        };
        const order = await razorpay.orders.create(options);
        console.log(order);

        return NextResponse.json({ orderId: order.id, status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to Generate RazorPay OrderID', status: 500 });
    }
}