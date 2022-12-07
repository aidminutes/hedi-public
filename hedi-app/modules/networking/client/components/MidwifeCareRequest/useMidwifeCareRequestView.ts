import useSWR, { KeyedMutator } from "swr";
import { IMidwifeCareConnection } from "@/modules/networking/types";
import { requestMyMidwifeCareConnection } from "@/modules/networking/client/request";
import { useRouter } from "next/router";
import { IPage } from "@/modules/common/types";
import { useUser } from "@/modules/auth/client/hooks";
import { myMidwifeCareConnectionsAPIUrl } from "@/modules/networking/types";
import { useMyProfile } from "@/modules/profile/client/hooks";
import { UserProfile } from "@/modules/profile/types";
import { MidwifeCareRequestEntry } from "@/modules/networking/types/MidwifeCareRequestEntry";
import { useState, useEffect } from "react";

export type CustomState =
  | "open"
  | "active"
  | "dismissed"
  | "completed"
  | "handshaking";

export const useMidwifeCareRequestView: (
  content: IPage
) => {
  isMissingData: boolean;
  isLoading: boolean;
  isValidating: boolean;
  route: string;
  midwifeCareConnection?: IMidwifeCareConnection;
  midwifeCareRequest?: MidwifeCareRequestEntry;
  lang: string;
  myProfile: UserProfile | null;
  customState: CustomState;
  mutate: KeyedMutator<IMidwifeCareConnection[]>;
  isPersonalProfile: boolean;
} = content => {
  const { lang } = content;
  const router = useRouter();
  /** TODO: This is not future proof. If we introduce new query params to this page (due to analytics for example),
   *        we would have to extend the "!== segments" check and use an array of possible known keys instead.
   *        Additionally a regex-check for uuid-format could be necessary to be safe. */
  const route = Object.keys(router.query).find(k => k !== "segments");

  const [customState, setCustomState] = useState<CustomState>("open");
  const [isPersonalProfile, setIsPersonalProfile] = useState(true);

  const [user, isLoadingUser] = useUser();
  const [myProfile, myProfileIsLoading] = useMyProfile(user, lang);
  let midwifeCareConnection: IMidwifeCareConnection | undefined;
  let midwifeCareRequest: MidwifeCareRequestEntry | undefined;
  const { data, isValidating, mutate } = useSWR<IMidwifeCareConnection[]>(
    [myMidwifeCareConnectionsAPIUrl, content.lang, route],
    (_, theLang, theRoute) =>
      requestMyMidwifeCareConnection(
        theLang,
        theRoute as string,
        user?.role === "personal" ? false : true
      ).then(x => (x ? [x] : [])),
    {
      revalidateOnFocus: false,
    }
  );
  if (data && data.length) {
    midwifeCareConnection = data[0];
    midwifeCareRequest = midwifeCareConnection.sender;
  }

  useEffect(() => {
    setIsPersonalProfile(user?.role === "personal");
  }, [user]);

  useEffect(() => {
    if (midwifeCareConnection) {
      const stateRoute = midwifeCareConnection.state.route;
      if (
        stateRoute.endsWith(".read") ||
        stateRoute.endsWith("tentative") ||
        stateRoute.endsWith("unread")
      )
        setCustomState("open");
      if (stateRoute.endsWith("handshaking")) setCustomState("handshaking");
      if (
        stateRoute.endsWith("dismissed") ||
        stateRoute.endsWith("cancelled") ||
        stateRoute.endsWith("rejected")
      )
        setCustomState("dismissed");
      if (stateRoute.endsWith("completed")) setCustomState("completed");
      if (stateRoute.endsWith("active")) setCustomState("active");
    }
  }, [midwifeCareConnection]);

  const isMissingData = !data;
  const isLoading = isMissingData || isValidating || isLoadingUser;

  return {
    isMissingData,
    isLoading,
    isValidating,
    route: route as string,
    midwifeCareRequest,
    midwifeCareConnection,
    lang,
    myProfile,
    customState,
    mutate,
    isPersonalProfile,
  };
};
