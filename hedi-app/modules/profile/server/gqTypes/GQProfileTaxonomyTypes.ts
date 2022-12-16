import { GQNumber } from "@/modules/graphql/server/gq-ts";
import { GQIEntity } from "@/modules/model/server";
import {
  IAvailability,
  IDataKind,
  IDataVisibility,
  IFluency,
  IPhoneKind,
  IWeekday,
} from "../../types";
import { IIndexedProfileTaxonomy } from "../../types/taxonomyTypes/IIndexedProfileTaxonomy";

export const GQIndexedProfileTaxonomy: IIndexedProfileTaxonomy = {
  ...GQIEntity,
  index: GQNumber,
};

export const GQAvailability: IAvailability = GQIndexedProfileTaxonomy;

export const GQFluency: IFluency = GQIndexedProfileTaxonomy;

export const GQDataKind: IDataKind = GQIndexedProfileTaxonomy;

export const GQDataVisibility: IDataVisibility = GQIndexedProfileTaxonomy;

export const GQPhoneKind: IPhoneKind = GQIndexedProfileTaxonomy;

export const GQWeekday: IWeekday = GQIndexedProfileTaxonomy;
