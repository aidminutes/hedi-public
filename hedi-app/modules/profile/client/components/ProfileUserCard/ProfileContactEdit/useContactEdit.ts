import { UserProfile, PersonalTypeNameString } from "@/modules/profile/types";
import { useState } from "react";
import { transformProfileUserCard } from "../transformProfileUserCard";
import { validWebsiteRegex, validEmailRegex } from "@/modules/react/validation";

export function useContactEdit(profile: UserProfile | null, lang: string) {
  const isPersonalProfile = profile?.type === PersonalTypeNameString;
  const {
    phone,
    email,
    website,
    emailVisibilityIndex,
  } = transformProfileUserCard(profile);
  const [websiteValue, setWebsiteValue] = useState(website);
  const handleWebsiteChange = (value: string) => setWebsiteValue(value);
  const [emailValue, setEmailValue] = useState(email);
  const [emailVisibilityValue, setEmailVisibilityValue] = useState(
    emailVisibilityIndex
  );
  const handleEmailChange = (value: string) => setEmailValue(value);
  const [phoneValue, setPhoneValue] = useState(phone);
  const handlePhoneChange = (value: string) => setPhoneValue(value);

  const [isWebsiteActive, setIsWebsiteActive] = useState(false);
  const [isWebsiteValid, setIsWebsiteValid] = useState(false);

  const handleWebsiteBlur = (value: string) => {
    setIsWebsiteActive(true);
    setIsWebsiteValid(validWebsiteRegex.test(value) || value.trim() === "");
  };
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailBlur = (value: string) => {
    setIsEmailActive(true);
    setIsEmailValid(validEmailRegex.test(value));
  };

  const handleEmailVisibilityValueChange = (value: string) => {
    setEmailVisibilityValue(getIdByString(value));
  };

  const setBackToInitial = () => {
    setWebsiteValue(website);
    setEmailValue(email);
    setPhoneValue(phone);

    setIsWebsiteActive(false);
    setIsWebsiteValid(false);

    setIsEmailActive(false);
    setIsEmailValid(false);
  };

  return {
    websiteValue,
    emailValue,
    phoneValue,
    emailVisibilityValue,
    isWebsiteActive,
    isWebsiteValid,
    isEmailActive,
    isEmailValid,
    isPersonalProfile,
    handleWebsiteBlur,
    handleEmailBlur,
    handleEmailChange,
    handlePhoneChange,
    handleWebsiteChange,
    handleEmailVisibilityValueChange,
    setBackToInitial,
  };
}

export function getIdByString(value: string) {
  return parseInt(value.substring(value.length - 1));
}
