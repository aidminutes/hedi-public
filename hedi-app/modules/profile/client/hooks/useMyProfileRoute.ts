import { useEffect, useState } from "react";
import { IUserInfo } from "@/modules/auth/types";
import { requestMyProfileRoute } from "../request";

export function useMyProfileRoute(
  user: IUserInfo | undefined,
  lang: string
): [string | null, boolean] {
  const [profileRoute, setProfileRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyProfileRoute = async () => {
      setIsLoading(true);
      const route = await requestMyProfileRoute(lang).catch(() =>
        setIsLoading(false)
      );
      if (route) setProfileRoute(route);

      setIsLoading(false);
    };

    // we can trigger without waiting on user info
    // api does serverside validation anyways
    fetchMyProfileRoute();
  }, [user?.name, lang]);

  return [profileRoute, isLoading];
}
