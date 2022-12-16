import {
  IProfile,
  IBusinessProfile,
  ILanguageLevel,
  UserProfile,
  IOrganisation,
} from "@/modules/profile/types";

export const parseLanguageSkillsFromProfile = (
  profile: UserProfile | IOrganisation
): ILanguageLevel[] => {
  const languageLevels: ILanguageLevel[] = [];
  if ("languageLevels" in profile && profile.languageLevels.length > 0)
    return profile.languageLevels;

  return languageLevels;
};
