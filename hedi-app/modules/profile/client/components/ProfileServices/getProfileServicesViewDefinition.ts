import {
  getLabelInstance,
  getGroupInstance,
  IComponent,
  IGroupComponent,
  ILabelComponent,
} from "@/modules/components";
import {
  getLanguagesDefinition,
  ILanguagesDefinition,
} from "./getLanguagesDefinition";

export interface IProfileServicesViewDefinition {
  allServices: IGroupComponent;
  servicesEmptyStateLabel: ILabelComponent;
  servicesTitleLabel: ILabelComponent;
  servicesDescriptionLabel: ILabelComponent;
  servicesTileTitleLabel: ILabelComponent;
  servicesCareTypesTitleLabel: ILabelComponent;
  servicesLabel: ILabelComponent;
  serviceGroupEmptyStateLabel: ILabelComponent;
  languagesDefinition: ILanguagesDefinition;
}

export const getProfileServicesViewDefinition = (
  components: IComponent[]
): IProfileServicesViewDefinition => ({
  allServices: getGroupInstance(components, "serviceSelect", {
    usage: "",
    labelText: "Leistungen",
    components: [],
  }),
  servicesEmptyStateLabel: getLabelInstance(
    components,
    "servicesEmptyStateLabel",
    {
      labelKind: "span",
      text: "Welche Leistungen kannst du deinen Klient:innen anbieten?",
    }
  ),
  servicesTitleLabel: getLabelInstance(components, "servicesTitleLabel", {
    labelKind: "h3",
    text: "Wähle deinen Leistungsumfang",
  }),
  servicesDescriptionLabel: getLabelInstance(
    components,
    "servicesDescriptionLabel",
    {
      labelKind: "paragraph",
      text:
        "Zeige deinen Klient:innen welche Services und Leistungen du anbietest. In welchen Sprachen kannst du sie anbieten?",
    }
  ),
  servicesTileTitleLabel: getLabelInstance(
    components,
    "servicesTileTitleLabel",
    {
      labelKind: "span",
      text: "Betreuungsart, Leistungen & Services",
    }
  ),
  servicesCareTypesTitleLabel: getLabelInstance(
    components,
    "servicesCareTypesTitleLabel",
    {
      labelKind: "label",
      text: "Angebotene Betreuungform",
    }
  ),
  servicesLabel: getLabelInstance(components, "servicesLabel", {
    labelKind: "label",
    text: "Weitere Leistungen & Services",
  }),
  serviceGroupEmptyStateLabel: getLabelInstance(
    components,
    "serviceGroupEmptyStateLabel",
    {
      labelKind: "label",
      text: "Du hast keine Leistungen in dieser Kategorie ausgewählt.",
    }
  ),
  languagesDefinition: getLanguagesDefinition(components),
});
