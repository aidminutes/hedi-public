import { IResetPasswordInfo } from "@/modules/auth/types/IResetPasswordInfo";
import { IValidateResetPasswordInfo } from "@/modules/auth/types/IValidateResetPasswordInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useResetPassword } from "../../../request/useResetPassword";

export function usePasswordReset() {
  const router = useRouter();
  const [isReseting, setIsReseting] = useState(false);
  const { response, loading, resetPassword } = useResetPassword();
  const [resetErrors, setResetErrors] = useState(response?.errors);
  const [isResetSucceed, setIsResetSucceed] = useState<boolean>(false);

  useEffect(() => {
    setResetErrors(response?.errors);
    setIsResetSucceed(!!response?.success);
  }, [response]);

  const tryResetPassword = async (info: IResetPasswordInfo) => {
    if (!loading && info.token != "" && info.password != "") {
      setIsReseting(true);
      await resetPassword({ ...info, lang: router.locale });
      setIsReseting(false);
    }
  };

  return {
    resetErrors,
    isReseting,
    isResetSucceed,
    tryResetPassword,
  };
}
