import Link from 'next/link'

type PropTypes = {
    href: string,
    text: string,
    className?: string,
}

const TextButton = ({ href, text, className }: PropTypes) => {
    let classList = className ? `${className} text-textClr uppercase` : "text-textClr uppercase"

    return (
        <Link href={href} className={classList}>
            {text}
        </Link>
    )
}

export default TextButton