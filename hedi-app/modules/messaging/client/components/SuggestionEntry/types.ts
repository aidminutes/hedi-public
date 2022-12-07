import { ILabelComponent } from "@/modules/components";
import { IEntity, IWithType } from "@/modules/model";
import { ReactChild } from "react";

export interface ISuggestionEntry
  extends ISuggestionEntryConfig,
    ISuggestionEntryDefinition {}

export interface ISuggestionEntryConfig {
  element: IEntity & IWithType;
  children?: ReactChild;
  alternativeClass?: string;
  clickHandler?: (route: string) => void;
  entryType?: "short" | "full";
}

export interface ISuggestionEntryDefinition {
  articleLabel: ILabelComponent;
  glossaryLabel: ILabelComponent;
  profileLabel: ILabelComponent;
}
