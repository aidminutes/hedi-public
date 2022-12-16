import { useRouter } from "next/router";
import { DependencyList, useEffect } from "react";
import { useUser } from "@/modules/auth/client/hooks";

export const useAuthorizedRedirect = (
  redirectUrl: string,
  deps?: DependencyList
): void => {
  const [user, isLoading] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // redirects to landing pages
      router.push(redirectUrl);
    }
  }, [user, isLoading, ...(deps ? deps : [])]);
};
