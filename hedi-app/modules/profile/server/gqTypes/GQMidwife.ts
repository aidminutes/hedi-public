import { GQString, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQIMutationResponse } from "@/modules/model/server";
import { GQICareType } from "@/modules/networking/server/gqTypes/GQICareType";
import { IMidwife, IUpsertMidwifeResponse } from "../../types";
import { GQIProfessionalProfile } from "./GQIProfessionalProfile";

const gqMidwife: IMidwife = {
  ...GQIProfessionalProfile,
  careTypes: [GQICareType],
};
export const GQMidwife = withInlineFragment(gqMidwife, "Midwife");

export const GQUpsertMidwifeResponse: IUpsertMidwifeResponse = {
  ...GQIMutationResponse,
  route: GQString,
  data: GQMidwife,
};
