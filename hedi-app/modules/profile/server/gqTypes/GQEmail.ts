import { GQString } from "@/modules/graphql/server/gq-ts";
import { IEmail } from "../../types";
import { GQDataKind, GQDataVisibility } from "./GQProfileTaxonomyTypes";

export const GQEmail: IEmail = {
  dataKind: GQDataKind,
  email: GQString,
  dataVisibility: GQDataVisibility,
};
