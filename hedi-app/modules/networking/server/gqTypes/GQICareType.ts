import { GQScalar, GQString } from "@/modules/graphql/server/gq-ts";
import { ICareType } from "../../types/ICareType";

export const GQICareType: ICareType = {
  route: GQScalar(),
  label: GQString,
};
