import React from 'react'
import { CartButton, OrdersButton } from './Buttons'

const Footer = () => {
    return (
        <div className='w-full flex_center p-3 fixed sm:relative bottom-0 bg-red-400'>
            <CartButton />
            <OrdersButton />
        </div>
    )
}

export default Footer