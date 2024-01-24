import Link from 'next/link'

type PropTypes = {
    href: string,
    text: string,
    className?: string,
}

const TextButton = ({ href, text, className }: PropTypes) => {
    return (
        <Link href={href} className={`${className} text-textClr capitalize tracking-wider`}>
            {text}
        </Link>
    )
}

export default TextButton