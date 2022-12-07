import React from "react";
import { LanguageSkill } from "./LanguageSkill";
import { ILanguageLevel } from "@/modules/profile/types";
import { ProfileCardType } from "../ProfileCard";
import { HeadlineSeperator } from "@/modules/common/client/components";
import { AddComment24 } from "@carbon/icons-react";

export interface ILanguageSkillsDefinition {
  headline: string;
}

export type ILanguageSkillsProps = {
  languageSkills: ILanguageLevel[];
  profileType: ProfileCardType;
} & ILanguageSkillsDefinition;

export const LanguageSkills = (props: ILanguageSkillsProps) => {
  const { languageSkills, headline, profileType } = props;
  if (!languageSkills?.length) return null;
  return (
    <div
      className={`hedi--language-skills hedi--profile--tile${
        profileType === 0 ? " hedi--language-skills--organisation" : ""
      }`}>
      <div className="hedi--profile__headline--wrap">
        <span className="mobile-only hedi--profile__headline--icon">
          <AddComment24 />
        </span>
        <h3>{headline}</h3>
      </div>
      <HeadlineSeperator />
      <table>
        <tbody>
          {languageSkills.map((skill, index) => (
            <LanguageSkill
              key={index + skill.language.route}
              languageLevel={skill}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
