"use client"

import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import LoaderIcon from './LoaderIcon';
import { CheckIcon, PlusIcon, UserPlus2Icon } from 'lucide-react';

type Props = {
    text?: string,
    className?: string,
    pending?: boolean,
    disabled?: boolean,
    icon?: "plus" | "user_plus" | "check"
}

const SubmitButton = ({ text = "Submit", className, pending = false, disabled = false, icon }: Props) => {
    const getIcon = (icon: Props['icon']) => {
        switch (icon) {
            case "plus":
                return <PlusIcon />;
            case "user_plus":
                return <UserPlus2Icon />;
            case "check":
                return <CheckIcon />;
            default:
                return null;
        }
    };

    return <Button
        type='submit'
        className={cn(className, "bg-primaryClr hover:bg-primaryClr/80 disabled:bg-primaryClr/50 flex_center gap-2 capitalize")}
        disabled={pending || disabled}>
        {pending ?
            <LoaderIcon width='23px' height='23px' />
            :
            <>
                {getIcon(icon)}
                <span>{text}</span>
            </>}
    </Button>
}

export default SubmitButton