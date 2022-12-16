import { IEntity, IWithType } from "@/modules/model";
import { ISuggestionEntryDefinition } from "../SuggestionEntry";

export type ISuggestions = ISuggestionsDefinition & ISuggestionsConfig;

export interface ISuggestionsDefinition {
  suggestionEntryDefinition: ISuggestionEntryDefinition;
}

export interface ISuggestionsConfig {
  searchIsActive: Boolean;
  elements: (IEntity & IWithType)[];
  handleElementSelection: (route: string) => void;
}
