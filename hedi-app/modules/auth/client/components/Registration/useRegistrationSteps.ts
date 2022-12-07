import { useState } from "react";

export function useRegistrationSteps() {
  const startingStep: number = 1;
  const totalSteps: number = 4;

  const [currentStep, setCurrentStep] = useState<number>(startingStep);

  const moveOneStepForward = () => {
    if (currentStep === totalSteps) return;
    setCurrentStep(currentStep + 1);
  };
  const moveOneStepBack = () => {
    if (currentStep === startingStep) return;
    setCurrentStep(currentStep - 1);
  };

  return {
    moveOneStepBack,
    moveOneStepForward,
    setCurrentStep,
    totalSteps,
    currentStep,
  };
}
