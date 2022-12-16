import { GQString } from "@/modules/graphql/server/gq-ts";
import { GQDataKind, GQDataVisibility } from "./GQProfileTaxonomyTypes";
import { IWebsite } from "../../types";

export const GQWebsite: IWebsite = {
  dataKind: GQDataKind,
  website: GQString,
  dataVisibility: GQDataVisibility,
};
