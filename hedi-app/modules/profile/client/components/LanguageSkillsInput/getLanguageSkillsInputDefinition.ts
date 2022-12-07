import {
  getBodyInstance,
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { ILanguageSkillsInputDefinition } from ".";
import { getLanguageLeveInputDefinition } from "./LanguageLevelInput";

export const getLanguageSkillsInputDefinition = (
  components: IComponent[]
): ILanguageSkillsInputDefinition => {
  const languageLevelInputDefinition = getLanguageLeveInputDefinition(
    components
  );
  return {
    languageSkillsLabel: getLabelInstance(components, "languageSkills", {
      labelKind: "span",
      text: "Sprachverständnis",
    }),
    languageLevelInputDefinition,
    addButton: getButtonInstance(components, "languageLevelAddButton", {
      buttonKind: "primary",
      usage: "",
      text: "Sprache hinzufügen",
    }),
    removeButton: getButtonInstance(components, "languageLevelRemoveButton", {
      buttonKind: "ghost",
      usage: "",
      text: "Sprache entfernen",
    }),

    midwifeSearchLanguageNotice: getBodyInstance(
      components,
      "midwifeSearchLanguageNotice",
      {
        body:
          "HEDI versucht eine Hebamme für dich zu finden, die deine Sprache spricht. Dafür ist es hilfreich zu wissen, welche Sprachen du sprichst.",
      }
    ),
  };
};
