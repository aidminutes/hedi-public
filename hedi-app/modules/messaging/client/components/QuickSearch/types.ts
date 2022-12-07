import { ITextInputComponent } from "@/modules/components";
import { ISuggestionsDefinition } from "../Suggestions";

export type IQuickSearch = IQuickSearchContent &
  IQuickSearchDefinition &
  IQuickSearchConfig;

export interface IQuickSearchContent {}

export interface IQuickSearchDefinition {
  suggestionsDefinition: ISuggestionsDefinition;
  textInput: ITextInputComponent;
  quickSearchLabel: string;
}

export interface IQuickSearchConfig {
  lang: string;
  onSelect?: (route: string) => void;
}
