import { useState } from 'react'

type Props = {
    width?: string,
    height?: string,
    className?: string,
    fill?: string,
    stroke?: string,
    isFilled?: boolean
}

const HeartSVG = ({ width = "100%", height = "100%", className = "", fill = "var(--pink)", isFilled = false, stroke = "var(--pink)" }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            fill={isFilled ? fill : "none"}
            stroke={stroke}
            viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
    )
}

export default HeartSVG