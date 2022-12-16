import { IRegisterInfo } from "@/modules/auth/types/IRegisterInfo";
import { IWizard } from "@/modules/common/types";
import { useState, useEffect } from "react";
import { useRegistration } from "./useRegistration";

export function useStepFour(
  registrationData: IRegisterInfo,
  userKind: string,
  setStep: Function,
  isPartOfWizard?: boolean,
  wizard?: IWizard
) {
  const {
    errors,
    handleSubmit,
    isLoading,
    isSuccess,
    hasMailError,
    setHasMailError,
  } = useRegistration(registrationData, isPartOfWizard, wizard);

  const [
    isStepFourProgressValid,
    setIsStepFourProgressValid,
  ] = useState<boolean>(false);
  const [isMidwifeChecked, setIsMidwifeChecked] = useState<boolean>(false);
  const [isGeneralTermsChecked, setIsGeneralTermsChecked] = useState<boolean>(
    false
  );
  const [isSafetyTermsChecked, setIsSafetyTermsChecked] = useState<boolean>(
    false
  );

  const handleChangeMidwifeCheckbox = (isChecked: boolean) => {
    setIsMidwifeChecked(isChecked);
  };
  const handleChangeGeneralTermsCheckbox = (isChecked: boolean) => {
    setIsGeneralTermsChecked(isChecked);
  };
  const handleChangeSafetyTermsCheckbox = (isChecked: boolean) => {
    setIsSafetyTermsChecked(isChecked);
  };

  const handleBackToStepThree = () => {
    setHasMailError(false);
    setStep(3);
  };

  const handleStepFour = () => {
    handleSubmit();
  };

  useEffect(() => {
    if (isSuccess) {
      setStep(5);
    }
    if (hasMailError) {
      setStep(6);
    }
  }, [isSuccess, hasMailError]);

  useEffect(() => {
    if (userKind === "midwife") {
      setIsStepFourProgressValid(
        isGeneralTermsChecked && isSafetyTermsChecked && isMidwifeChecked
      );
      return;
    }
    setIsStepFourProgressValid(isGeneralTermsChecked && isSafetyTermsChecked);
  }, [isGeneralTermsChecked, isSafetyTermsChecked, isMidwifeChecked, userKind]);

  return {
    isStepFourProgressValid,
    isGeneralTermsChecked,
    isSafetyTermsChecked,
    isMidwifeChecked,
    isLoading,
    handleChangeMidwifeCheckbox,
    handleBackToStepThree,
    handleChangeGeneralTermsCheckbox,
    handleChangeSafetyTermsCheckbox,
    handleStepFour,
  };
}
