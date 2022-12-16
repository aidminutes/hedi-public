import { GQDate, GQString } from "@/modules/graphql/server/gq-ts";
import { GQIStateful, GQIWithType } from "@/modules/model/server";
import { GQOwnerProfile } from "./GQOwnerProfile";
import { MidwifeCareRequestEntry } from "../../types/MidwifeCareRequestEntry";
import { GQPregnancyEntry } from "@/modules/profile/server/gqTypes/GQPregnancyEntry";
import { GQService } from "@/modules/profile/server/gqTypes/GQService";
import { GQILanguage } from "@/modules/common/server/gqTypes/GQILanguage";
import { GQICareType } from "./GQICareType";

export const GQMidwifeCareRequestEntry: MidwifeCareRequestEntry = {
  ...GQIWithType,
  label: GQString,
  body: GQString,
  ...GQIStateful,
  ownerProfile: GQOwnerProfile,
  pregnancy: GQPregnancyEntry,
  created: GQDate,
  careTypes: [GQICareType],
  languages: [GQILanguage],
  services: [GQService],
};
