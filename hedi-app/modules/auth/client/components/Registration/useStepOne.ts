import { IRegisterInfo } from "@/modules/auth/types";
import { GlobalWizardStates, IWizard } from "@/modules/common/types";
import { useState, useEffect } from "react";

export function useStepOne(
  registerData: IRegisterInfo,
  moveStepForward: Function,
  isPartOfWizard?: boolean,
  wizard?: IWizard
) {
  const [userKind, setUserKind] = useState<string>("");
  const [isStepOneProgressValid, setIsStepOneProgressValid] = useState<boolean>(
    false
  );

  const handleUserKindChange = (value: string) => {
    setUserKind(value);
  };

  const handleStepOne = () => {
    registerData.role = userKind;
    moveStepForward();
  };

  const handleLoginInWizard = () => {
    if (!!isPartOfWizard && !!wizard) {
      wizard?.back(GlobalWizardStates.LOGIN);
    }
  };

  useEffect(() => {
    setIsStepOneProgressValid(userKind !== "");
  }, [userKind]);

  return {
    userKind,
    isStepOneProgressValid,
    handleUserKindChange,
    handleStepOne,
    handleLoginInWizard,
  };
}
