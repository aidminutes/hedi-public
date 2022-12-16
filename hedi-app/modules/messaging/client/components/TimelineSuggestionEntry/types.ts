import { ISuggestionEntryDefinition } from "../SuggestionEntry";

export type ITimelineSuggestionEntry = ITimelineSuggestionContent &
  ITimelineSuggestionEntryDefinition &
  ITimelineSuggestionEntryConfig;

export interface ITimelineSuggestionContent {
  route: string;
}

export type ITimelineSuggestionEntryDefinition = ISuggestionEntryDefinition;

export interface ITimelineSuggestionEntryConfig {
  inTimeline?: boolean;
}
