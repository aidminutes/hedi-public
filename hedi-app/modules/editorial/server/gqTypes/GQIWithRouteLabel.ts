import { GQString } from "@/modules/graphql/server/gq-ts";
import { IWithRouteLabel } from "@/modules/editorial/types";

export const GQIWithRouteLabel: IWithRouteLabel = {
  routelabel: GQString,
};
