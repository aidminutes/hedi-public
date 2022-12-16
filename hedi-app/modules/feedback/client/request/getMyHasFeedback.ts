import { useEffect, useState } from "react";
import { jsonFetcher } from "@/modules/common/utils";
import { IUserInfo } from "@/modules/auth/types";
import { hasMyFeedbackAPIUrl } from "../../types";
import { IAPIResponse } from "@/modules/model";

export function getMyHasFeedback(
  user: IUserInfo | undefined
): [boolean, boolean] {
  const [hasFeedback, setHasFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestHasFeedback = async () => {
      setIsLoading(true);
      const resp = await jsonFetcher<IAPIResponse<boolean> | null>(
        hasMyFeedbackAPIUrl
      );
      if (resp?.data) setHasFeedback(resp.data);

      setIsLoading(false);
    };

    if (user?.name) requestHasFeedback();
  }, [user?.name]);

  return [hasFeedback, isLoading];
}
