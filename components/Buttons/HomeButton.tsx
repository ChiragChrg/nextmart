"use client"

type Props = {
    width?: string,
    height?: string,
    className?: string,
    showText?: boolean
}

const HomeButton = ({ width = "100%", height = "100%", className = "", showText = false }: Props) => {
    return (
        <div className={`${className} flex_center flex-col cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            {showText && <span className="text-[0.8em]">Home</span>}
        </div>
    )
}

export default HomeButton