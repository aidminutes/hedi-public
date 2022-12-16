import { useRouter } from "next/router";
import { useState, FormEventHandler, FormEvent, useEffect } from "react";
import { useAuthorizedRedirect } from "@/modules/react/hooks";
import { login } from "@/modules/auth/client";
import { useUser } from "@/modules/auth/client/hooks";
import { GlobalWizardStates, IWizard } from "@/modules/common/types";
import { useMessagingSync } from "../../hooks/useMessagingSync";

export function useLogin(
  redirectUrl: string,
  isPartOfWizard?: boolean,
  wizard?: IWizard
) {
  redirectUrl = (redirectUrl ?? '').split('?redirect=')[0];
  const router = useRouter();

  if (!isPartOfWizard) useAuthorizedRedirect(redirectUrl);

  const [user] = useUser();
  useMessagingSync();

  const [isLoggedIn, setIsLoggedIn] = useState(user !== undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user !== undefined);
  }, [user]);

  const handleLogin: FormEventHandler<HTMLFormElement> = event => {
    if (!isPartOfWizard) {
      if (redirectUrl) router.prefetch(redirectUrl);
    }
    setIsLoading(true);
    setHasError(false);
    setIsSuccess(false);
    submitLogin(event, !isPartOfWizard ? redirectUrl : undefined).then(resp => {
      setIsLoading(false);
      if (resp && resp.ok) setIsSuccess(true);
      else setHasError(true);
    });
  };

  const handleRegisterInWizard = () => {
    if (!!isPartOfWizard && !!wizard) {
      wizard?.next(GlobalWizardStates.REGISTER);
    }
  };
  const goWizardNext = () => {
    if (!!isPartOfWizard && !!wizard) {
      wizard?.next(undefined, undefined, user);
    }
  };

  const handleForgotPasswordInWizard = () => {
    if (!!isPartOfWizard && !!wizard) {
      wizard?.next(GlobalWizardStates.FORGOT_PASSWORD);
    }
  };

  return {
    handleLogin,
    handleRegisterInWizard,
    handleForgotPasswordInWizard,
    goWizardNext,
    isLoading,
    hasError,
    isSuccess,
    isLoggedIn,
  };
}

function submitLogin(event: FormEvent<HTMLFormElement>, redirectUrl?: string) {
  event.preventDefault();
  const {
    username: { value: username },
    password: { value: password },
  } = event.target as typeof event.target & {
    username: { value: string };
    password: { value: string };
  };
  return login(username, password, redirectUrl);
}
