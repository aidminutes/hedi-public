import { IComponent } from "@/modules/components";
import { getSuggestionEntryDefinition } from "../SuggestionEntry";
import { ISuggestionsDefinition } from "./types";

export const getSuggestionsDefinition = (
  components: IComponent[]
): ISuggestionsDefinition => ({
  suggestionEntryDefinition: getSuggestionEntryDefinition(components),
});
