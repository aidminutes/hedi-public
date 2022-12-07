import { withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized, GQIWithType } from "@/modules/model/server";
import { IBusinessProfileEntry } from "../../types";
import { GQIAddress } from "./GQIAddress";
import { GQIProfile } from "./GQIProfile";
import { GQProfession } from "./GQProfession";

export const GQBusinessProfileEntry: IBusinessProfileEntry = {
  ...GQIWithType,
  ...GQIEntityLocalized,
  ...withInlineFragment(
    {
      ...GQIProfile,
      profession: GQProfession,
      addresses: [GQIAddress],
    },
    "IBusinessProfile"
  ),
};
