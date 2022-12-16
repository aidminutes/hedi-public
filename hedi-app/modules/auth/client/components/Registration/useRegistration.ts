import { useRouter } from "next/router";
import { SyntheticEvent, useState, useEffect } from "react";
import { useRegister } from "../../request";
import { IRegisterInfo } from "@/modules/auth/types";
import { IWizard } from "@/modules/common/types";

export function useRegistration(
  registrationData: IRegisterInfo,
  isPartOfWizard?: boolean,
  wizard?: IWizard
) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { response, loading, register } = useRegister(
    isPartOfWizard ? wizard : undefined
  );
  const [info, setInfo] = useState<IRegisterInfo>(registrationData);
  const [errors, setErrors] = useState(response?.errors);
  const [isSuccess, setIsSuccess] = useState(!!response?.success);
  const [hasMailError, setHasMailError] = useState(!!response.errors?.mail);
  const [hasPasswordError, setHasPasswordError] = useState(
    !!response.errors?.pass
  );
  const [hasGivenNameError, setHasGivenNameError] = useState(
    !!response.errors?.givenName
  );
  const [hasFamilyNameError, setHasFamilyNameError] = useState(
    !!response.errors?.familyName
  );

  useEffect(() => {
    setInfo(registrationData);
  }, [registrationData]);

  useEffect(() => {
    setErrors(response?.errors);
    setHasPasswordError(!!response.errors?.pass);
    setHasMailError(!!response.errors?.mail);
    setIsSuccess(!!response?.success);
  }, [response]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (info && !loading) {
      await register({ ...info, lang: router.locale, commit: true });
      setIsLoading(false);
    }
  };

  const handleBackButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    router.back();
  };

  return {
    errors,
    handleBackButtonClick,
    handleSubmit,
    setHasMailError,
    isLoading,
    isSuccess,
    hasPasswordError,
    hasMailError,
    hasGivenNameError,
    hasFamilyNameError,
  };
}
