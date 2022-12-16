import { GQIEntityTranslated } from "@/modules/model/server";
import { GQImage } from "@/modules/media/server/gqTypes/GQMedia";
import { IProfile } from "../../types";
import { GQEmail } from "./GQEmail";
import { GQIAddress } from "./GQIAddress";
import { GQILanguageLevel } from "./GQILanguageLevel";
import { GQPhone } from "./GQPhone";

export const GQIProfile: IProfile = {
  ...GQIEntityTranslated,
  image: GQImage,
  languageLevels: [GQILanguageLevel],
  addresses: [GQIAddress],
  phones: [GQPhone],
  emails: [GQEmail],
};
