import { IOrganisation, UserProfile } from "@/modules/profile/types";
import { transformProfileToEntry } from "@/modules/profile/utils";
import { parseContactsFromProfile } from "../Contact";
import { parseConsultationHoursFromProfile } from "../ConsultationHours";
import { parseLanguageSkillsFromProfile } from "../LanguageSkills";
import { parseServiceGroupFromProfile } from "../ServiceGroup/parseServiceGroupFromProfile";

export const getProfileViewContent = (profile: IOrganisation | UserProfile) => {
  return {
    profileEntry: transformProfileToEntry({
      ...profile,
      addresses: profile.addresses || [],
    }),
    contacts: parseContactsFromProfile({
      ...profile,
      addresses: profile.addresses || [],
    }),
    consultationHours: parseConsultationHoursFromProfile(profile),
    languageSkills: parseLanguageSkillsFromProfile(profile),
    servicesData: parseServiceGroupFromProfile(profile),
  };
};
