import { useState } from "react";
import { jsonPost } from "@/modules/common/utils";
import {
  IActivateRequest,
  IActivateResponse,
  activateAPIUrl,
} from "../../types";

export const useActivateRegisteration = () => {
  const [response, setResponse] = useState<IActivateResponse>({
    success: false,
  });
  const [loading, setLoading] = useState(false);
  const activate = async (info: IActivateRequest) => {
    setLoading(true);
    setResponse(
      await jsonPost<IActivateResponse>(activateAPIUrl, info).then(data =>
        data ? data : { success: false }
      )
    );

    setLoading(false);
  };
  return { response, loading, activate };
};
