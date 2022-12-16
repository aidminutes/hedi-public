import { getSelectInstance, IComponent } from "@/modules/components";
import { ILanguageLevelInputDefinition } from ".";

export const getLanguageLeveInputDefinition = (
  components: IComponent[]
): ILanguageLevelInputDefinition => ({
  languageSelect: getSelectInstance(components, "languageSelect", {
    labelText: "Sprache",
    items: [],
  }),
  fluencySelect: getSelectInstance(components, "fluencySelect", {
    labelText: "Verständnis",
    items: [],
  }),
});
