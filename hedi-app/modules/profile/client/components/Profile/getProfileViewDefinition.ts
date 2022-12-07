import {
  getButtonInstance,
  IComponent,
  getGroupInstance,
  getLabelInstance,
} from "@/modules/components/types";
import { IProfileViewDefinition } from ".";
import { getCosultantHoursDefinition } from "../ConsultationHours";
import { getContactDefinition } from "../Contact";
import { getLanguageSkillsDefinition } from "../LanguageSkills";
import { getProfileEntryDefinition } from "../ProfileEntry";
import { getProfileCardDefinition } from "@/modules/profile/client/components/ProfileCard";
import { getServicesDefinition } from "../Services";

export const getProfileViewDefinition = (
  components: IComponent[]
): IProfileViewDefinition => {
  return {
    profileEntryDefinition: getProfileEntryDefinition(components),
    profileEditButton: getButtonInstance(components, "profileEditButton", {
      buttonKind: "primary",
      usage: "",
      text: "Profil bearbeiten",
    }),
    contactDefinition: getContactDefinition(components),
    cosultantHoursDefinition: getCosultantHoursDefinition(components),
    languageSkillsDefinition: getLanguageSkillsDefinition(components),
    profileCardDefinition: getProfileCardDefinition(components),
    servicesDefinition: getServicesDefinition(components),
    backgroundImageDefinition: getGroupInstance(components, "images", {
      usage: "",
      components: [],
    }),
    emailText: getLabelInstance(components, "emailEditProfileText", {
      labelKind: "span",
      text: "Ich möchte meinen Eintrag ändern lassen",
    }),
    emailAddress: getLabelInstance(components, "emailAddress", {
      labelKind: "span",
      text: "kontakt@hedi.app",
    }),
  };
};
