import { IResetPasswordSendEmailRequest } from "@/modules/auth/types";
import { GlobalWizardStates, IWizard } from "@/modules/common/types";
import {
  ISystemContextData,
  useSystemContext,
} from "@/modules/shell/client/contexts/SystemContext";
import { useRouter } from "next/router";
import { useState, FormEventHandler, FormEvent, useEffect } from "react";
import { useResetPasswordSendEmail } from "../../../request";
import { validEmail } from "../../../util/EmailRegExp";

export function useResetPasswordEmailView(
  isPartOfWizard?: boolean,
  wizard?: IWizard
) {
  const router = useRouter();
  const systemContext = useSystemContext();
  const [emailInput, setEmailInput] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleEmailInputChange = (value: string) => {
    setEmailInput(value);
    setIsEmailValid(validEmail.test(value));
  };

  const handleEmailBlur = () => {
    setIsEmailActive(true);
    setIsEmailValid(validEmail.test(emailInput));
  };
  const handleRegisterInWizard = () => {
    if (!!isPartOfWizard && !!wizard) {
      wizard?.back(GlobalWizardStates.REGISTER);
    }
  };

  const { response, loading, sendEmail } = useResetPasswordSendEmail();
  const handleSendEmailAction = async (e: FormEvent) => {
    e.preventDefault();
    if (emailInput && isEmailActive && isEmailValid && !loading) {
      const info = {
        email: emailInput,
        lang: router.locale,
      } as IResetPasswordSendEmailRequest;
      if (isPartOfWizard && wizard) {
        const { wizardData, wizardId } = systemContext.sysData ?? {};
        const extraInfo: Pick<ISystemContextData, "wizardData" | "wizardId"> = {
          wizardData,
          wizardId,
        };
        info.extraInfo = JSON.stringify(extraInfo);
      }
      await sendEmail(info);
      setIsEmailSent(true);
    }
  };

  return {
    handleEmailInputChange,
    handleEmailBlur,
    handleSendEmailAction,
    handleRegisterInWizard,
    emailInput,
    isEmailActive,
    isEmailValid,
    isEmailSent,
    loading,
    response,
  };
}
