import { GQString } from "@/modules/graphql/server/gq-ts";
import {
  GQDataKind,
  GQDataVisibility,
  GQPhoneKind,
} from "./GQProfileTaxonomyTypes";
import { IPhone } from "../../types";

export const GQPhone: IPhone = {
  dataKind: GQDataKind,
  phone: GQString,
  phoneKind: GQPhoneKind,
  dataVisibility: GQDataVisibility,
};
