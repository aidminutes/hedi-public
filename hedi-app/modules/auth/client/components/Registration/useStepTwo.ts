import { IRegisterInfo } from "@/modules/auth/types";
import { useState, useEffect } from "react";
export function useStepTwo(
  userKind: string,
  registerData: IRegisterInfo,
  moveStepForward: Function
) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [preSelectedLanguage, setPreSelectedLanguage] = useState("");
  const [isStepTwoProgressValid, setIsStepTwoProgressValid] = useState<boolean>(
    false
  );
  const [givenNameValue, setGivenNameValue] = useState("");
  const [familyNameValue, setfamilyNameValue] = useState("");

  useEffect(() => {
    setPreSelectedLanguage(getSelectedLanguage(userKind));
  }, [userKind]);

  useEffect(() => {
    setIsStepTwoProgressValid(
      givenNameValue.trim() !== "" && familyNameValue.trim() !== ""
    );
  }, [givenNameValue, familyNameValue]);

  const handleGivenNameChange = (value: string) => {
    setGivenNameValue(value);
  };
  const handleFamilyNameChange = (value: string) => {
    setfamilyNameValue(value);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleStepTwo = () => {
    registerData.givenName = givenNameValue;
    registerData.familyName = familyNameValue;
    registerData.lang = selectedLanguage || preSelectedLanguage;
    moveStepForward();
  };

  return {
    givenNameValue,
    familyNameValue,
    selectedLanguage,
    preSelectedLanguage,
    isStepTwoProgressValid,
    handleGivenNameChange,
    handleFamilyNameChange,
    handleLanguageChange,
    handleStepTwo,
  };
}

function getSelectedLanguage(userKind: string) {
  const usrlang = navigator.language;
  if (userKind === "midwife") return "de";

  return usrlang;
}
