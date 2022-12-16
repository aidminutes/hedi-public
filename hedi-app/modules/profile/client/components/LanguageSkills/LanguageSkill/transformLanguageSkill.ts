import { ILanguageLevel } from "@/modules/profile/types";

export function transformLanguageSkill(props: {
  languageLevel: ILanguageLevel;
}) {
  const {
    languageLevel: {
      language: { label },
      fluency: { index: level },
    },
  } = props;

  return { label, level };
}
