import { IEntityLocalized } from "@/modules/model";
import { useMyProfileRoute } from "../../hooks";
import { useUser } from "@/modules/auth/client/hooks";

export const useShowProfileEditButton = (profile: IEntityLocalized) => {
  const [user, userIsLoading] = useUser();
  const [myProfileRoute, myProfileRouteIsLoading] = useMyProfileRoute(
    user,
    profile.lang
  );

  const loading = userIsLoading || myProfileRouteIsLoading;
  return loading ? false : myProfileRoute === profile.route;
};
