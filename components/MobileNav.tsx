import React from 'react'
import { CartButton, HomeButton, OrdersButton, ThemeButton } from './Buttons'

const MobileNav = () => {
    return (
        <div className='sm:hidden w-full flex justify-evenly items-center py-2 fixed sm:relative bottom-0 bg-baseClr border-t border-secondaryClr'>
            <HomeButton showText width="25px" height="25px" />
            <CartButton showText width="25px" height="25px" />
            <OrdersButton showText width="25px" height="25px" />
            <ThemeButton width="25px" height="25px" />
        </div>
    )
}

export default MobileNav