import { useState, useEffect, FormEvent } from "react";
import { validPasswordRegex } from "@/modules/react/validation";
import { usePasswordReset } from "./usePasswordReset";
import { useRouter } from "next/router";
import { useSystemContext } from "@/modules/shell/client/contexts/SystemContext";
export function usePasswordView(isPartOfWizard?: boolean) {
  const router = useRouter();
  const systemContext = useSystemContext();

  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordRepeatInput, setPasswordRepeatInput] = useState<string>("");
  const [isPasswordMatching, setIsPasswordMatching] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);
  const [isPasswordRepeatActive, setIsPasswordRepeatActive] = useState<boolean>(
    false
  );
  const [isProgressValid, setIsProgressValid] = useState<boolean>(false);
  //const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    resetErrors,
    isReseting,
    isResetSucceed,
    tryResetPassword,
  } = usePasswordReset();

  const handlePasswordInput = (value: string) => {
    setIsPasswordActive(true);
    setIsPasswordValid(validPasswordRegex.test(value));
    setPasswordInput(value);
  };

  const handlePasswordRepeatInput = (value: string) => {
    setPasswordRepeatInput(value);
  };

  const handlePasswordRepeatBlur = () => {
    setIsPasswordRepeatActive(true);
    if (passwordInput === passwordRepeatInput) {
      setIsPasswordMatching(true);
      return;
    }
    setIsPasswordMatching(false);
  };

  const handleSave = async () => {
    if (passwordInput && isPasswordMatching && isPasswordValid && !isReseting) {
      let currentToken = "";
      if (isPartOfWizard) {
        const { token } = (systemContext.sysData?.redirectQuery as any) as {
          token: string;
        };
        currentToken = token;
      } else {
        currentToken = router.query.token as string;
      }

      await tryResetPassword({
        token: currentToken,
        password: passwordInput,
      });
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isPasswordMatching && isPasswordValid) setIsProgressValid(true);
  }, [isPasswordMatching, isPasswordValid]);

  return {
    passwordInput,
    passwordRepeatInput,
    isPasswordActive,
    isPasswordMatching,
    isPasswordRepeatActive,
    isPasswordValid,
    isProgressValid,
    handlePasswordInput,
    handlePasswordRepeatBlur,
    handlePasswordRepeatInput,
    handleSave,
    isSubmitted,
    isResetSucceed,
  };
}
