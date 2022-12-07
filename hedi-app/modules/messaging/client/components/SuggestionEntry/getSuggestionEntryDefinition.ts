import { getLabelInstance, IComponent } from "@/modules/components";
import { ISuggestionEntryDefinition } from "./types";

export const getSuggestionEntryDefinition = (
  components: IComponent[]
): ISuggestionEntryDefinition => ({
  articleLabel: getLabelInstance(components, "articleLabel", {
    labelKind: "span",
    text: "Artikel",
  }),
  glossaryLabel: getLabelInstance(components, "glossaryTermLabel", {
    labelKind: "span",
    text: "Glossar",
  }),
  profileLabel: getLabelInstance(components, "profileLabel", {
    labelKind: "span",
    text: "Profil",
  }),
});
