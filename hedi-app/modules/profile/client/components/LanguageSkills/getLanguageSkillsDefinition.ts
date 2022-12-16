import { findLabelInstance, IComponent } from "@/modules/components";
import { ILanguageSkillsDefinition } from ".";

export const getLanguageSkillsDefinition = (
  components: IComponent[]
): ILanguageSkillsDefinition => {
  return {
    headline:
      findLabelInstance(components, "languageSkills")?.text ??
      "Sprachverständnis",
  };
};
