import {
  IConnection,
  myOrganisationConnectionsAPIUrl,
} from "@/modules/networking/types";
import { jsonFetcher } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";

export const requestMyOrganisationConnections = (): Promise<
  IConnection[] | null
> =>
  jsonFetcher<IAPIResponse<IConnection[]>>(
    myOrganisationConnectionsAPIUrl
  ).then(res => res?.data ?? null);
