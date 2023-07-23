import React from 'react'

type Props = {
    width?: string,
    height?: string,
    className?: string,
}

const IconSVG = ({ width = "100%", height = "100%", className = "" }: Props) => {
    return (
        <svg width={width} height={height} className={className} viewBox="0 0 37 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 0V37.7812L30.8333 29.6562V8.93749L22.6111 18.8906L19.1167 14.4219L30.8333 0H37Z" fill="var(--primary)" />
            <path d="M0 39H6.16667V8.93749L30.8333 39H35.7667L6.16667 0H0V39Z" fill="var(--text)" />
        </svg>
    )
}

export default IconSVG