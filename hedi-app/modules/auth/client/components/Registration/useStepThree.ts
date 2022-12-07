import { IRegisterInfo } from "@/modules/auth/types";
import { useState, useEffect } from "react";
import {
  validPasswordRegex,
  validEmailRegex,
} from "@/modules/react/validation";
export function useStepThree(
  registrationData: IRegisterInfo,
  moveForward: Function
) {
  const [isEmailMatching, setIsEmailMatching] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailRepeatInput, setEmailRepeatInput] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const [isEmailRepeatActive, setIsEmailRepeatActive] = useState<boolean>(
    false
  );
  const [isPasswordActive, setIsPasswordActive] = useState<boolean>(false);

  const [
    isStepThreeProgressValid,
    setIsStepThreeProgressValid,
  ] = useState<boolean>(false);

  const handleEmailInputChange = (value: string) => {
    setEmailInput(value);
  };
  const handleEmailRepeatInputChange = (value: string) => {
    setEmailRepeatInput(value);
  };
  useEffect(() => {
    checkEmailIsMatching();
  }, [emailRepeatInput, emailInput]);

  const handleEmailBlur = () => {
    setIsEmailActive(true);
    setIsEmailValid(validEmailRegex.test(emailInput));
  };
  const handleEmailRepeatBlur = () => {
    setIsEmailRepeatActive(true);
    checkEmailIsMatching();
  };

  const checkEmailIsMatching = () => {
    if (emailInput === emailRepeatInput) {
      setIsEmailMatching(true);
      return;
    }
    setIsEmailMatching(false);
  };

  const handlePasswordInput = (value: string) => {
    setIsPasswordActive(true);
    setIsPasswordValid(validPasswordRegex.test(value));
    setPasswordInput(value);
  };

  const handleStepThree = () => {
    registrationData.pass = passwordInput;
    registrationData.mail = emailInput;
    moveForward();
  };

  useEffect(() => {
    setIsStepThreeProgressValid(
      isPasswordActive && isEmailMatching && isPasswordValid && isEmailMatching
    );
  }, [isPasswordActive, isEmailRepeatActive, isPasswordValid, isEmailMatching]);

  return {
    emailInput,
    emailRepeatInput,
    passwordInput,
    isEmailActive,
    isEmailValid,
    isStepThreeProgressValid,
    isEmailMatching,
    isPasswordValid,
    isEmailRepeatActive,
    isPasswordActive,
    handleEmailInputChange,
    handleEmailRepeatInputChange,
    handleEmailRepeatBlur,
    handlePasswordInput,
    handleEmailBlur,
    handleStepThree,
  };
}
