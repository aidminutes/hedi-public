import { useState } from "react";
import useSWR from "swr";
import { jsonFetcher, jsonPost } from "@/modules/common/utils";
import {
  IRegisterRequest,
  IRegisterResponse,
  registerAPIUrl,
} from "../../types";
import { useValidate } from "./useValidate";
import { getEncodeInfo, login } from "../functions";
import { IWizard } from "@/modules/common/types/IWizard";
import {
  ISystemContextData,
  useSystemContext,
} from "@/modules/shell/client/contexts/SystemContext";

export const useRegister = (wizard?: IWizard) => {
  const systemContext = useSystemContext();
  const [response, setResponse] = useState<IRegisterResponse>({
    success: false,
  });
  const [loading, setLoading] = useState(false);
  const register = async (info: IRegisterRequest) => {
    setLoading(true);
    const registerParams = { ...info };
    if (wizard) {
      const { wizardData, wizardId } = systemContext.sysData ?? {};
      const extraInfo: Pick<ISystemContextData, "wizardData" | "wizardId"> = {
        wizardData,
        wizardId,
      };
      registerParams.extraInfo = JSON.stringify(extraInfo);
    }
    const validationResponse = await useValidate(registerParams);
    !validationResponse?.errors
      ? setResponse(
          await jsonPost<IRegisterResponse>(
            registerAPIUrl,
            registerParams
          ).then(data => (data ? data : { success: false }))
        )
      : setResponse(
          validationResponse ??
            ({
              errors: { generic: "validation generic error" },
            } as IRegisterResponse)
        );
    setLoading(false);
  };

  const autoSignIn = (info: IRegisterRequest, redirect?: string) => {
    if (info.mail && info.pass) {
      const dest = `${window.location.protocol}//${window.location.hostname}${redirect}`;
      login(info.mail, info.pass, dest);
    }
  };

  return { response, loading, register, autoSignIn };
};

export function useRegisterEager(info: IRegisterRequest) {
  const registerResult = useSWR<IRegisterResponse>(
    info.registrationcode || info.mail || info.pass
      ? registerAPIUrl + "/?" + getEncodeInfo(info)
      : null,
    (url: string) => jsonFetcher<IRegisterResponse>(url)
  );
  return { ...registerResult };
}
