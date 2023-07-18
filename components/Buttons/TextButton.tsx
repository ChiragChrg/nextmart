import Link from 'next/link'

type PropTypes = {
    href: string,
    text: string,
    ClassName?: string,
}

const TextButton = ({ href, text, ClassName }: PropTypes) => {
    let classList = ClassName ? `${ClassName} text-textClr uppercase` : "text-textClr uppercase"

    return (
        <Link href={href} className={classList}>
            {text}
        </Link>
    )
}

export default TextButton