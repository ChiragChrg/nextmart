"use client"

import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import LoaderIcon from './LoaderIcon';

type Props = {
    text?: string,
    className?: string
    pending?: boolean
}

const SubmitButton = ({ text = "Submit", className, pending = false }: Props) => {

    return <Button
        type='submit'
        className={cn(className, "bg-primaryClr hover:bg-primaryClr/80 disabled:bg-primaryClr/50")}
        disabled={pending}>
        {pending ?
            <LoaderIcon width='23px' height='23px' />
            :
            text}
    </Button>
}

export default SubmitButton