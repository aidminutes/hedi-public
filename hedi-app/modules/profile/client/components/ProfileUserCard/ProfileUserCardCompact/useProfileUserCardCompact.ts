import { IUserProfile } from "@/modules/profile/types/IUserProfile";
import { useState, useEffect } from "react";

interface ILanguageLevelGroup {
  group: string;
  items: string[];
}

export function useProfileUserCardCompact(
  lang: string,
  profile?: IUserProfile
) {
  const [myProfile, profileIsLoading] = [profile, false];

  const [languageLevelGroups, setLanguageLevelGroups] = useState<
    ILanguageLevelGroup[]
  >([]);

  useEffect(() => {
    if (myProfile?.languageLevels) {
      setLanguageLevelGroups(
        myProfile.languageLevels.reduce((list, level) => {
          let groupEntry = list.find(
            entry => entry.group == level.fluency.label
          );
          if (groupEntry) {
            groupEntry.items.push(level.language.label);
          } else {
            list.push({
              group: level.fluency.label,
              items: [level.language.label],
            });
          }
          return list;
        }, [] as ILanguageLevelGroup[])
      );
    }
  }, [myProfile]);

  return {
    myProfile,
    profileIsLoading,
    languageLevelGroups,
  };
}
