import {
  GQBoolean,
  GQNumber,
  GQString,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import { GQIMutationResponse, GQIWithType } from "@/modules/model/server";
import { IPregnancy, IUpsertPregnancyResponse } from "../../types";

export const gqPregnancy: IPregnancy = {
  ...GQIWithType,
  route: GQString,
  expectedDeliveryDate: GQString,
  multiplePregnancy: GQBoolean,
  gravida: GQNumber,
  para: GQNumber,
  prevPrematureBirth: GQBoolean,
  prevBirthComplication: GQBoolean,
  prevCSection: GQBoolean,
  prevPostpartumDepression: GQBoolean,
  prevBreastfeedingProblem: GQBoolean,
};
export const GQPregnancy = withInlineFragment(gqPregnancy, "Pregnancy");

const gqUpsertPregnancyResponse: IUpsertPregnancyResponse = {
  ...GQIMutationResponse,
  pregnancy: gqPregnancy,
};

export const GQUpsertPregnancyResponse = withInlineFragment(
  gqUpsertPregnancyResponse,
  "UpsertPregnancyResponse"
);
