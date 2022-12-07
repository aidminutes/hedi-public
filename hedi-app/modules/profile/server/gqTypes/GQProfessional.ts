import { GQString, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQIMutationResponse } from "@/modules/model/server";
import { GQIProfessionalProfile } from "./GQIProfessionalProfile";
import { IProfessional, IUpsertProfessionalResponse } from "../../types";

const gqProfessional: IProfessional = {
  ...GQIProfessionalProfile,
};
export const GQProfessional = withInlineFragment(
  gqProfessional,
  "Professional"
);

export const GQUpsertProfessionalResponse: IUpsertProfessionalResponse = {
  ...GQIMutationResponse,
  route: GQString,
  data: GQProfessional,
};
