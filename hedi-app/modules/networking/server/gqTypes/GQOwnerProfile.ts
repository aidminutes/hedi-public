import { gqPick, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQPersonal } from "@/modules/profile/server/gqTypes/GQPersonal";
import { OwnerProfile } from "../../types/IMidwifeCareRequestOwner";

const gqOwnerProfile: OwnerProfile = gqPick(GQPersonal, [
  "type",
  "addresses",
  "label",
  "route",
  "image",
  "emails",
  "languageLevels",
  "phones",
  "birthDate",
]);

export const GQOwnerProfile = withInlineFragment(gqOwnerProfile, "Personal");
