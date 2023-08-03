import React from 'react'

type Props = {
    width: string,
    height: string,
    radius?: string,
    className?: string
}

const RectSkeleton = ({ width, height, radius = "4px", className = "" }: Props) => {
    return (
        <div style={{ width, height, borderRadius: radius }} className={`SkeletonLoader ${className}`} />
    )
}

export default RectSkeleton