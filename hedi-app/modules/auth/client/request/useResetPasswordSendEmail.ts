import { useState } from "react";
import { jsonPost } from "@/modules/common/utils";
import {
  resetPasswordSendEmailAPIUrl,
  IResetPasswordSendEmailResponse,
  IResetPasswordSendEmailRequest,
} from "../../types";

export const useResetPasswordSendEmail = () => {
  const [response, setResponse] = useState<IResetPasswordSendEmailResponse>({
    success: false,
  });
  const [loading, setLoading] = useState(false);
  const sendEmail = async (info: IResetPasswordSendEmailRequest) => {
    setLoading(true);
    setResponse(
      await jsonPost<IResetPasswordSendEmailResponse>(
        resetPasswordSendEmailAPIUrl,
        info
      ).then(data => (data ? data : { success: false }))
    );
    setLoading(false);
  };
  return { response, loading, sendEmail };
};
