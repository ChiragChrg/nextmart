"use client"

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import LoaderIcon from './LoaderIcon';

type Props = {
    text?: string,
    className?: string
}

const SubmitButton = ({ text = "Submit", className }: Props) => {
    const { pending } = useFormStatus();

    return <Button
        type='submit'
        className={cn(className)}
        disabled={pending}>
        {pending ?
            <LoaderIcon width='23px' height='23px' />
            :
            text}
    </Button>
}

export default SubmitButton