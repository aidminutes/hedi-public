import { useMyConnections } from "@/modules/networking/client/hooks/useMyConnections";
import { useMemo, useState, useEffect } from "react";
import {
  myMidwifeCareConnectionsAPIUrl,
  IMidwifeCareConnection,
  IUpsertMidwifeRequestPreferenceResponse,
} from "@/modules/networking/types";
import { useUser } from "@/modules/auth/client/hooks";
import useSWR from "swr";
import { requestMyMidwifeRequestPreference } from "../request";

export const useMyMidwifeCareConnections = (
  lang: string = "de",
  initialConnections?: IMidwifeCareConnection[]
) => {
  const {
    connections,
    isLoading,
    error,
    mutate,
  } = useMyConnections<IMidwifeCareConnection>(
    lang,
    myMidwifeCareConnectionsAPIUrl,
    initialConnections,
    10000
  );

  const [user] = useUser();
  const [isPersonalProfile, setIsPersonalProfile] = useState(false);
  const [hasActiveAndNoPending, setHasActiveAndNoPending] = useState(false);
  useEffect(() => {
    setIsPersonalProfile(user?.role === "personal");
  }, [user]);

  const { data: preferenceSettings, isValidating } = useSWR(
    user ? [user?.name] : null,
    _ =>
      user?.role === "midwife"
        ? requestMyMidwifeRequestPreference().then(
            data =>
              ({
                success: false,
                data,
              } as IUpsertMidwifeRequestPreferenceResponse)
          )
        : { success: false, data: undefined }
  );
  const [getsDirectCareRequests, setGetsDirectCareRequests] = useState(
    preferenceSettings?.data?.directCareRequest
  );

  useEffect(() => {
    setGetsDirectCareRequests(preferenceSettings?.data?.directCareRequest);
  }, [preferenceSettings?.data]);

  const activeConnections = useMemo(
    () => connections?.filter(c => c.state.route.includes("active")) || [],
    [connections]
  );
  const myCareConnections = useMemo(
    () =>
      connections?.filter(
        c =>
          c.state.route.includes("active") ||
          c.state.route.includes("completed") ||
          c.state.route.includes("care_cancelled_by_sender") ||
          c.state.route.includes("care_cancelled_by_recipient")
      ) || [],
    [connections]
  );
  const finishedConnections = useMemo(
    () =>
      connections?.filter(
        c =>
          c.state.route.includes("completed") ||
          c.state.route.includes("care_cancelled_by_sender") ||
          c.state.route.includes("care_cancelled_by_recipient")
      ) || [],
    [connections]
  );

  // active connections werden so aus der anzeige rausgefiltert
  const pendingConnections = useMemo(
    () =>
      connections?.filter(
        c =>
          !c.state.route.includes("active") &&
          !c.state.route.includes("completed") &&
          !c.state.route.includes("care_cancelled_by_sender") &&
          !c.state.route.includes("care_cancelled_by_recipient")
      ) || [],
    [connections]
  );

  const pendingWithoutArchiveConnections = useMemo(
    () =>
      connections?.filter(
        c =>
          !c.state.route.includes("active") &&
          !c.state.route.includes("completed") &&
          !c.state.route.includes("care_cancelled_by_sender") &&
          !c.state.route.includes("care_cancelled_by_recipient") &&
          !c.state.route.endsWith("rejected") &&
          !c.state.route.endsWith("cancelled") &&
          !c.state.route.endsWith("rejected_and_cancelled")
      ) || [],
    [connections]
  );

  const archiveConnections = useMemo(
    () =>
      connections?.filter(
        c =>
          c.state.route.endsWith("rejected") ||
          c.state.route.endsWith(
            "cancelled" || c.state.route.endsWith("rejected_and_cancelled")
          )
      ) || [],
    [connections]
  );

  useEffect(() => {
    setHasActiveAndNoPending(
      activeConnections.length > 0 && !pendingConnections.length
    );
  }, [activeConnections, pendingConnections]);

  return {
    connections,
    activeConnections,
    pendingConnections,
    isLoading,
    error,
    mutate,
    getsDirectCareRequests,
    isPersonalProfile,
    hasActiveAndNoPending,
    myCareConnections,
    finishedConnections,
    archiveConnections,
    pendingWithoutArchiveConnections,
  };
};
