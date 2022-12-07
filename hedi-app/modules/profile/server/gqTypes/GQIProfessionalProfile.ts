import { withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQBusinessProfile } from "./GQBusinessProfile";
import { IProfessionalProfile } from "../../types/IProfessionalProfile";
import { GQIUserProfile } from "./GQIUserProfile";

const gqIProfessionalProfile: IProfessionalProfile = {
  ...GQBusinessProfile,
  ...GQIUserProfile,
  organisations: [GQBusinessProfile],
};
export const GQIProfessionalProfile = withInlineFragment(
  gqIProfessionalProfile,
  "IProfessionalProfile"
);
