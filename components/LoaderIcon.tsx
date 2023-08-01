import React from 'react'

type Props = {
    width?: string,
    height?: string,
    className?: string
}

const LoaderIcon = ({ width = "100%", height = "100%", className = "" }: Props) => {

    const NextAnimation = {
        animation: 'SvgAnimNext 3s cubic-bezier(0.47, 0, 0.745, 0.715) 0s both infinite',
        WebkitAnimation: 'SvgAnimNext 3s cubic-bezier(0.47, 0, 0.745, 0.715) 0s both infinite',
        fill: 'transparent',
    };
    const MartAnimation = {
        animation: 'SvgAnimMart 3s cubic-bezier(0.47, 0, 0.745, 0.715) 0.5s both infinite',
        WebkitAnimation: 'SvgAnimMart 3s cubic-bezier(0.47, 0, 0.745, 0.715) 0.5s both infinite',
        fill: 'transparent',
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            fill="none"
            stroke='none'
            viewBox="0 0 37 39"
        >
            <path
                fill="#007BFF"
                d="M37 0v37.781l-6.167-8.125V8.937l-8.222 9.954-3.494-4.47L30.833 0H37z"
                stroke='none'
                className={`MartAnimation ${className}`}
            ></path>
            <path
                fill="#050505"
                d="M0 39h6.167V8.937L30.833 39h4.934L6.167 0H0v39z"
                stroke='none'
                className={`NextAnimation ${className}`}
            ></path>
        </svg>
    )
}

export default LoaderIcon