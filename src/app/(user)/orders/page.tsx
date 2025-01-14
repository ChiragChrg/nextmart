"use client"

import { useFetchOrders } from '@/hooks/useFetchData'
import { RootState } from '@/store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Orders = () => {
    const userId = useSelector<RootState>(state => state.user.user?.id) as string
    const { data: orderList, status: orderStatus } = useFetchOrders(userId)

    return (
        <main className='main_style'>
            <h1>Your Orders</h1>

            {orderList?.map((order, orderIndex) => (
                <div key={orderIndex} className="order">
                    <h2>Order ID: {order.orderId}</h2>
                    <h3>Status: {order.status}</h3>
                    <h4>Total Amount: ${order.totalAmount}</h4>

                    {order.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="order-item">
                            <p>Product: {item.product?.title}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Unit Rate: ${item.unitRate}</p>
                            <p>Total Price: ${item.price}</p>
                        </div>
                    ))}
                </div>
            ))}
        </main>
    )
}

export default Orders