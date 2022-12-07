import { GQNumber, GQString } from "@/modules/graphql/server/gq-ts";
import { IAddress } from "../../types";
import { GQDataKind, GQDataVisibility } from "./GQProfileTaxonomyTypes";

export const GQIAddress: IAddress = {
  dataKind: GQDataKind,
  dataVisibility: GQDataVisibility,
  city: GQString,
  postalCode: GQString,
  latLong: GQString,
  latLongApprox: GQString,
  detailsVisibility: GQDataVisibility,
  street: GQString,
  streetNumber: GQString,
  additionalInfo: GQString,
};
