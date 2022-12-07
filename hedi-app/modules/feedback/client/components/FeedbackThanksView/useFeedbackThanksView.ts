import { useMyProfileRoute } from "@/modules/profile/client/hooks";
import { getMyHasFeedback } from "../../request/getMyHasFeedback";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IPage } from "@/modules/common/types";
import {
  findButtonInstance,
  findLinkInstance,
  findBodyInstance,
} from "@/modules/components/types";
import { useUser } from "@/modules/auth/client/hooks";

export function useFeedbackThanksView({ content }: { content: IPage }) {
  const { components } = content;

  const [user, isLoading] = useUser();
  const [myProfileRoute, myProfileRouteIsLoading] = useMyProfileRoute(
    user,
    content.lang
  );
  const [hasFeedback, hasFeedbackLoading] = getMyHasFeedback(user);

  const router = useRouter();
  const noProfileRoute =
    findLinkInstance(components, "noProfileRoute")?.href || "/";
  const noFeedbackRoute =
    findLinkInstance(components, "noFeedbackRoute")?.href || "/";

  const backRoute = findLinkInstance(components, "backRoute")?.href || "/";
  const backButton = findButtonInstance(components, "backButton");
  const body = findBodyInstance(components, "body");

  useEffect(() => {
    if (!isLoading && !user) router.push("/" + content.lang);
    else if (!myProfileRouteIsLoading && !myProfileRoute) {
      router.push(noProfileRoute);
    } else if (!hasFeedbackLoading && hasFeedback !== true)
      router.push(noFeedbackRoute);
  }, [
    user,
    isLoading,
    myProfileRoute,
    myProfileRouteIsLoading,
    hasFeedback,
    hasFeedbackLoading,
  ]);

  return { backRoute, backButton, body };
}
