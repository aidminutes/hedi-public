import { IComponent } from "@/modules/components";
import { getCallImageDetailDefinition } from "../ImageDetail/getImageDetailDefinitions";
import { getSuggestionEntryDefinition } from "../SuggestionEntry/getSuggestionEntryDefinition";
import { IMessageEventDefinition } from "./types";

export const getMessageEventDefinition = (
  components: IComponent[]
): IMessageEventDefinition => {
  return {
    imageDetailDefinition: getCallImageDetailDefinition(components),
    suggestionEntryDefinition: getSuggestionEntryDefinition(components),
  };
};
