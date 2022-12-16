import { useState } from "react";
import { jsonPost } from "@/modules/common/utils";
import { resetPasswordAPIUrl, validateResetPasswordAPIUrl } from "../../types";
import { IResetPasswordResponse } from "../../types/IResetPasswordResponse";
import { IResetPasswordRequest } from "../../types/IResetPasswordRequest";

export const useResetPassword = () => {
  const [response, setResponse] = useState<IResetPasswordResponse>({
    success: false,
  });
  const [loading, setLoading] = useState(false);
  const resetPassword = async (info: IResetPasswordRequest) => {
    setLoading(true);
    setResponse(
      await jsonPost<IResetPasswordResponse>(
        resetPasswordAPIUrl,
        info
      ).then(data => (data ? data : { success: false }))
    );

    setLoading(false);
  };
  return { response, loading, resetPassword };
};
