import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { IActivateInfo } from "@/modules/auth/types/IActivateInfo";
import { useActivateRegisteration } from "../../request/useActivateRegistration";
import {
  ISystemContextData,
  SystemContext,
  useSystemContext,
} from "@/modules/shell/client/contexts/SystemContext";

export function useActivation(isPartOfWizard?: boolean) {
  const router = useRouter();
  const systemContext = useSystemContext();

  const [isLoading, setIsLoading] = useState(false);

  const { response, loading, activate } = useActivateRegisteration();
  const [errors, setErrors] = useState(response?.errors);
  const [isSuccess, setIsSuccess] = useState(!!response?.success);
  useEffect(() => {
    setErrors(response?.errors);
    setIsSuccess(!!response?.success);
  }, [response]);

  useEffect(() => {
    if (!isPartOfWizard) {
      const { token } = (router.query as any) as IActivateInfo;
      if (token) tryActivate({ token });
    }
  }, [router.query.token]);

  useEffect(() => {
    if (isPartOfWizard) {
      const { token } = (systemContext.sysData
        ?.redirectQuery as any) as IActivateInfo;
      if (token) tryActivate({ token });
    }
  }, []);

  const tryActivate = async (info: IActivateInfo) => {
    if (!loading && info.token != "") {
      setIsLoading(true);
      await activate({ ...info, lang: router.locale });
      setIsLoading(false);

      if (isPartOfWizard) {
        systemContext.setSysData({
          ...systemContext.sysData,
          redirectQuery: undefined,
        });
      }
    }
  };

  return {
    errors,
    isLoading,
    isSuccess,
  };
}
