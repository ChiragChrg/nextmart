import React from 'react'

type Props = {
    size: string
    radius?: string,
    className?: string
}

const CircleSkeleton = ({ size, radius = "100%", className = "" }: Props) => {
    return (
        <div style={{ width: size, height: size, borderRadius: radius }} className={`SkeletonLoader ${className}`} />
    )
}

export default CircleSkeleton