import { GQIEntity, GQIWithType } from "@/modules/model/server";
import { GQString, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQImage } from "@/modules/media/server/gqTypes/GQMedia";
import { GQIAddress } from "@/modules/profile/server/gqTypes/GQIAddress";
import { GQProfession } from "@/modules/profile/server/gqTypes/GQProfession";
import { IConnectionProfile } from "../../types";
import { GQService } from "@/modules/profile/server/gqTypes/GQService";
import { GQICareType } from "./GQICareType";
import { GQILanguageLevel } from "@/modules/profile/server/gqTypes/GQILanguageLevel";
import { GQEmail } from "@/modules/profile/server/gqTypes/GQEmail";
import { GQPhone } from "@/modules/profile/server/gqTypes/GQPhone";
import { GQWebsite } from "@/modules/profile/server/gqTypes/GQWebsite";
import { GQIConsultationHour } from "@/modules/profile/server/gqTypes/GQIConsultationHour";

export const GQIConnectionProfile: IConnectionProfile = {
  ...GQIEntity,
  ...GQIWithType,
  addresses: [GQIAddress],
  image: GQImage,
  profession: withInlineFragment(GQProfession, "Profession"),
  services: [GQService],
  languageLevels: [GQILanguageLevel],
  careTypes: [GQICareType],
  familyName: GQString,
  givenName: GQString,
  namePrefix: GQString,
  emails: [GQEmail],
  phones: [GQPhone],
  websites: [GQWebsite],
  consultationHours: [GQIConsultationHour],
};
