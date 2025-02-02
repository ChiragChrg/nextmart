"use client"

import { ReactElement, useState } from "react";

export const useMultiStepForm = (steps: ReactElement[]) => {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)

    const next = () => {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i

            return i + 1
        })
    }

    const previous = () => {
        setCurrentStepIndex(i => {
            if (i <= 0) return i

            return i - 1
        })
    }

    const goTo = (index: number) => {
        setCurrentStepIndex(index)
    }

    return {
        currentStep: currentStepIndex,
        stepContent: steps[currentStepIndex],
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        steps,
        next,
        previous,
        goTo
    }
}