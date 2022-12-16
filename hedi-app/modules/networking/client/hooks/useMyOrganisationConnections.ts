import { useMemo } from "react";
import { useMyConnections } from "@/modules/networking/client/hooks/useMyConnections";
import {
  myOrganisationConnectionsAPIUrl,
  IOrganisationConnection,
} from "@/modules/networking/types";

export const useMyOrganisationConnections = (
  lang: string = "de",
  initialConnections?: IOrganisationConnection[]
) => {
  const {
    connections,
    isLoading,
    error,
    mutate,
  } = useMyConnections<IOrganisationConnection>(
    lang,
    myOrganisationConnectionsAPIUrl,
    initialConnections
  );

  const activeOrganisationConnections = useMemo(
    () =>
      connections?.filter(connection =>
        connection.state.route.includes("accepted")
      ) ?? [],
    [connections]
  );
  const pendingOrganisationConnections = useMemo(
    () =>
      connections?.filter(
        connection => !connection.state.route.includes("accepted")
      ) ?? [],
    [connections]
  );

  return {
    activeOrganisationConnections,
    pendingOrganisationConnections,
    isLoading,
    error,
    mutate,
  };
};
