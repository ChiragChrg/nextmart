import React from 'react'
import { StarSVG } from '@/assets/SVGs'

const StarRating = ({ rating }: { rating: number }) => {
    return <div className="flex relative">
        <StarSVG width='20px' height='20px' isFilled={1 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={2 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={3 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={4 <= rating} />
        <StarSVG width='20px' height='20px' isFilled={5 <= rating} />
    </div>
}

export default StarRating