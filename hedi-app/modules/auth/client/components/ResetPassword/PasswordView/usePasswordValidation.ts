import { IValidateResetPasswordInfo } from "@/modules/auth/types/IValidateResetPasswordInfo";
import { useSystemContext } from "@/modules/shell/client/contexts/SystemContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useValidateResetPassword } from "../../../request/useValidateResetPassword";

export function usePasswordValidation(isPartOfWizard?: boolean) {
  const router = useRouter();
  const systemContext = useSystemContext();
  const [isValidating, setIsValidating] = useState(true);
  const {
    response,
    loading,
    validateResetPassword,
  } = useValidateResetPassword();
  const [validationErrors, setValidationErrors] = useState(response?.errors);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setValidationErrors(response?.errors);
    setIsValid(!!response?.success);
  }, [response]);

  useEffect(() => {
    if (!isPartOfWizard) {
      const { token } = (router.query as any) as IValidateResetPasswordInfo;
      if (token) tryValidateResetPass({ token });
    }
  }, [router.query.token]);

  useEffect(() => {
    if (isPartOfWizard) {
      const { token } = (systemContext.sysData?.redirectQuery as any) as {
        token: string;
      };
      if (token) tryValidateResetPass({ token });
    }
  }, []);

  const tryValidateResetPass = async (info: IValidateResetPasswordInfo) => {
    if (!loading && info.token != "") {
      setIsValidating(true);
      await validateResetPassword({ ...info, lang: router.locale });
      setIsValidating(false);
    }
  };

  return {
    validationErrors,
    isValidating,
    isValid,
  };
}
