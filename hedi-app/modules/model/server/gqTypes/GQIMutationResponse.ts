import { GQBoolean, GQScalar } from "@/modules/graphql/server/gq-ts";
import { IMutationResponse } from "../../IMutationResponse";
import { ErrorMap } from "../../ErrorMap";

export const GQIMutationResponse: IMutationResponse = {
  success: GQBoolean,
  errors: GQScalar<ErrorMap>(),
};
