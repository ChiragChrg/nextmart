import React from 'react'

type Props = {
    width?: string,
    height?: string,
    className?: string,
    altColor?: boolean
}

const LoaderIcon = ({ width = "100%", height = "100%", className = "", altColor = false }: Props) => {
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
                fill={altColor ? "#FFFFFF" : "#050505"}
                d="M0 39h6.167V8.937L30.833 39h4.934L6.167 0H0v39z"
                stroke='none'
                className={`NextAnimation ${className}`}
            ></path>

            <style>{`
                @-webkit-keyframes SvgMartAnim {
                    0% {
                        fill: transparent;
                        scale: 0.8;
                    }
                
                    75% {
                        fill: rgb(0, 123, 255);
                        scale: 1;
                    }
                
                    100% {
                        fill: transparent;
                        scale: 0.8;
                    }
                }
                
                @keyframes SvgMartAnim {
                    0% {
                        fill: transparent;
                        scale: 0.8;
                    }
                
                    75% {
                        fill: rgb(0, 123, 255);
                        scale: 1;
                    }
                
                    100% {
                        fill: transparent;
                        scale: 0.8;
                    }
                }
                
                @-webkit-keyframes SvgNextAnim {
                    0% {
                        fill: transparent;
                        scale: 0.8;
                    }
                
                    75% {
                        fill: ${altColor ? "#FFFFFF" : "#050505"};
                        scale: 1;
                    }
                
                    100% {
                        fill: transparent;
                        scale: 0.8;
                    }
                }
                
                @keyframes SvgNextAnim {
                    0% {
                        fill: transparent;
                        scale: 0.8;
                    }
                
                    75% {
                        fill: ${altColor ? "#FFFFFF" : "#050505"};
                        scale: 1;
                    }
                
                    100% {
                        fill: transparent;
                        scale: 0.8;
                    }
                }`
            }</style>
        </svg>
    )
}

export default LoaderIcon