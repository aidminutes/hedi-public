import {
  getLabelInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { getSuggestionsDefinition } from "../Suggestions";
import { IQuickSearchDefinition } from "./types";

export const getQuickSearchDefinition = (
  components: IComponent[]
): IQuickSearchDefinition => {
  return {
    suggestionsDefinition: getSuggestionsDefinition(components),
    textInput: getTextInputInstance(components, "quickSearchTextInput", {
      type: "text",
      labelText: "keyword",
    }),
    quickSearchLabel:
      getLabelInstance(components, "quickSearchLabel", {
        labelKind: "span",
        text: "Schnellsuche",
      }).text ?? "Schnellsuche",
  };
};
