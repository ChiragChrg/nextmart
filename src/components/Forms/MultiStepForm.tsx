"use client"

import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import React, { Fragment } from 'react'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import SubmitButton from '../CustomUI/SubmitButton'

type Props = {
    children: React.ReactElement[],
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    isPending: boolean
}

const MultiStepForm = ({ children, onSubmit, isPending }: Props) => {
    const { currentStep, stepContent, steps, isFirstStep, isLastStep, next, previous } = useMultiStepForm(children)

    const handleNext = () => {
        const form = document.querySelector('form') as HTMLFormElement;
        if (form.checkValidity()) {
            next();
        } else {
            form.reportValidity();
        }
    }

    return (
        <form onSubmit={onSubmit} className='flex flex-col justify-between items-center gap-6 w-full max-w-[800px] p-4 max-h-[90%] rounded-md border border-secondaryClr shadow-lg'>
            <div className="w-full flex_center">
                {steps.map((_, index) => {
                    const isActiveStep = index <= currentStep;

                    return (
                        <Fragment key={index}>
                            <div className={`w-full h-0.5 ${isActiveStep ? 'bg-primaryClr' : 'bg-secondaryClr_Alt'}`}></div>
                            <Button
                                variant={isActiveStep ? "default" : "outline"}
                                className={cn("disabled:opacity-100", isActiveStep ? "bg-primaryClr text-white" : "border-primaryClr text-primaryClr")}
                                disabled>
                                {index + 1}
                            </Button>
                        </Fragment>
                    )
                })}
                <div className="w-full h-0.5 bg-secondaryClr"></div>
            </div>

            {stepContent}

            <div className="w-full flex justify-between items-center">
                <Button
                    variant={'outline'}
                    type='button'
                    onClick={previous}
                    disabled={isFirstStep}
                    className='border-primaryClr text-primaryClr hover:bg-secondaryClr hover:text-primaryClr'>
                    <ChevronLeftIcon />
                    <span>Previous</span>
                </Button>
                {isLastStep ?
                    <SubmitButton text='Create Product' icon='plus' pending={isPending} />
                    :
                    <Button
                        variant={'outline'}
                        type='button'
                        onClick={handleNext}
                        disabled={isLastStep}
                        className='border-primaryClr text-primaryClr hover:bg-secondaryClr hover:text-primaryClr'>
                        <ChevronRightIcon />
                        <span>Next</span>
                    </Button>}
            </div>
        </form>
    )
}

export default MultiStepForm