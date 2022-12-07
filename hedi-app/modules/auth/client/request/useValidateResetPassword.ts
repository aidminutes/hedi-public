import { useState } from "react";
import { jsonPost } from "@/modules/common/utils";
import { validateResetPasswordAPIUrl } from "../../types";
import { IValidateResetPasswordResponse } from "../../types/IValidateResetPasswordResponse";
import { IValidateResetPasswordRequest } from "../../types/IValidateResetPasswordRequest";

export const useValidateResetPassword = () => {
  const [response, setResponse] = useState<IValidateResetPasswordResponse>({
    success: false,
  });
  const [loading, setLoading] = useState(false);
  const validateResetPassword = async (info: IValidateResetPasswordRequest) => {
    setLoading(true);
    setResponse(
      await jsonPost<IValidateResetPasswordResponse>(
        validateResetPasswordAPIUrl,
        info
      ).then(data => (data ? data : { success: false }))
    );
    setLoading(false);
  };
  return { response, loading, validateResetPassword };
};
