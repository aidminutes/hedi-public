import {
  getLabelInstance,
  IComponent,
  ILabelComponent,
} from "@/modules/components";

export interface ILanguagesDefinition {
  languagesTileLabel: ILabelComponent;
  languagesEmptyStateLabel: ILabelComponent;
  languagesPersonalEmptyStateLabel: ILabelComponent;
}

export function getLanguagesDefinition(
  components: IComponent[]
): ILanguagesDefinition {
  return {
    languagesTileLabel: getLabelInstance(components, "languagesTileLabel", {
      labelKind: "span",
      text: "Sprachen",
    }),
    languagesEmptyStateLabel: getLabelInstance(
      components,
      "languagesEmptyStateLabel",
      {
        labelKind: "span",
        text: "In welchen Sprachen bietest du deine Leistungen an?",
      }
    ),
    languagesPersonalEmptyStateLabel: getLabelInstance(
      components,
      "languagesPersonalEmptyStateLabel",
      {
        labelKind: "span",
        text: "Welche Sprachen sprichst du?",
      }
    ),
  };
}
