import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMyProfileRoute } from "../../hooks";
import { useUser } from "@/modules/auth/client/hooks";

export const useProfilePreview = (lang: string) => {
  const router = useRouter();
  const [user, userIsLoading] = useUser();
  const [myProfileRoute, myProfileRouteIsLoading] = useMyProfileRoute(
    user,
    lang
  );
  useEffect(() => {
    if (!myProfileRouteIsLoading && myProfileRoute) router.push(myProfileRoute);
  }, [user?.name, userIsLoading, myProfileRoute, myProfileRouteIsLoading]);

  return { myProfileRouteIsLoading };
};
