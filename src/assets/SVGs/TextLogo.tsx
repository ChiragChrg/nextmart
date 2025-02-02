import React from 'react'

type Props = {
    width?: string,
    height?: string,
    className?: string,
}

const LogoSVG = ({ width = "100%", height = "100%", className = "" }: Props) => {
    return (
        <svg width={width} height={height} className={className} viewBox="0 0 404 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 46V0H9.71111L47.0222 46V0H86.8889V7.15556H54.6889V19.4222H80.2444V26.5778H54.6889V38.8444H86.8889V46H47.0222H37.3111L7.66667 9.71111V46H0Z" fill="hsl(var(--textClr))" />
            <path d="M106.822 46H97.1111L112.444 27.0889L117.556 33.2222L106.822 46Z" fill="hsl(var(--textClr))" />
            <path d="M143.878 46H133.911L97.1111 0.511111H106.822L120.367 16.8667L133.911 0.511111H143.622L125.222 23L143.878 46Z" fill="hsl(var(--textClr))" />
            <path d="M176.844 46H169.178V7.15556H153.333V0.511111H192.689V7.15556H176.844V46Z" fill="hsl(var(--textClr))" />
            <path d="M220.8 46V0H228.467L243.289 15.3333L258.111 0H265.778V46H258.111V9.71111L243.289 23L228.467 9.71111V46H220.8Z" fill="hsl(var(--primaryClr))" />
            <path d="M296.7 7.66667L281.111 46H273.444L292.867 0H300.533L319.956 46H313.311L296.7 7.66667Z" fill="hsl(var(--primaryClr))" />
            <path d="M329.667 23L339.378 46H346.789L340.4 30.6667H356.244L355.733 0H319.956L323.278 7.66667H348.067V23H329.667Z" fill="hsl(var(--primaryClr))" />
            <path d="M403.267 0H363.911V7.66667H379.756V46H387.422V7.66667H403.267V0Z" fill="hsl(var(--primaryClr))" />
        </svg>

    )
}

export default LogoSVG