import {
  getBodyInstance,
  getLabelInstance,
  IBodyComponent,
  IComponent,
  ILabelComponent,
} from "@/modules/components/types";
import {
  getLanguagesDefinition,
  ILanguagesDefinition,
} from "../ProfileServices/getLanguagesDefinition";

export interface IProfileUserCardDefinition {
  midwifeHeadlineLabel: ILabelComponent;
  midwifeIntroText: IBodyComponent;
  personalHeadlineLabel: ILabelComponent;
  personalIntroText: IBodyComponent;
  userTilePersonHeadlineLabel: ILabelComponent;
  userTilePersonStateLabel: ILabelComponent;
  userTileContactHeadlineLabel: ILabelComponent;
  userTileContactEmptyStateLabel: ILabelComponent;
  userTileAvailabilityHeadlineLabel: ILabelComponent;
  userTileAvailibilityEmptyStateLabel: ILabelComponent;
  userTileImageHeadlineLabel: ILabelComponent;
  userTileImageEmptyStateLabel: ILabelComponent;
  name: ILabelComponent;
  city: ILabelComponent;
  street: ILabelComponent;
  email: ILabelComponent;
  website: ILabelComponent;
  phone: ILabelComponent;
  streetHintLabel: ILabelComponent;
  saveLabel: ILabelComponent;
  resetLabel: ILabelComponent;
  languagesDefinition: ILanguagesDefinition;
}

export const getProfileUserCardDefinition = (
  components: IComponent[]
): IProfileUserCardDefinition => ({
  midwifeHeadlineLabel: getLabelInstance(components, "midwifeHeadlineLabel", {
    labelKind: "h3",
    text: "Teile dein Hebammenprofil",
  }),
  midwifeIntroText: getBodyInstance(components, "midwifeIntroText", {
    body:
      "<p>Welche Daten möchtest du einen Klient:innen auf HEDI zur Verfügung stellen?</p>",
  }),
  personalHeadlineLabel: getLabelInstance(components, "personalHeadlineLabel", {
    labelKind: "h3",
    text: "Dein Profil",
  }),
  personalIntroText: getBodyInstance(components, "personalIntroText", {
    body:
      "<p>Hier steht ein Satz mit Infos zur Sichtbarkeit. Auch, um den Unterschied zwischen HEDI- und Hebammenprofil zu erklären.</p>",
  }),
  userTilePersonHeadlineLabel: getLabelInstance(
    components,
    "userTilePersonHeadlineLabel",
    { labelKind: "span", text: "Person & Ort" }
  ),
  userTilePersonStateLabel: getLabelInstance(
    components,
    "userTilePersonEmptyStateLabel",
    { labelKind: "p", text: "Wo findet man dich?" }
  ),
  userTileContactHeadlineLabel: getLabelInstance(
    components,
    "userTileContactHeadlineLabel",
    { labelKind: "span", text: "Kontakt" }
  ),
  userTileContactEmptyStateLabel: getLabelInstance(
    components,
    "userTileContactEmptyStateLabel",
    { labelKind: "p", text: "Wie möchtest du erreichbar sein?" }
  ),
  userTileAvailabilityHeadlineLabel: getLabelInstance(
    components,
    "userTileAvailabilityHeadlineLabel",
    { labelKind: "span", text: "Erreichbarkeit" }
  ),
  userTileAvailibilityEmptyStateLabel: getLabelInstance(
    components,
    "userTileAvailibilityEmptyStateLabel",
    { labelKind: "p", text: "Wann möchtest du erreichbar sein?" }
  ),
  userTileImageHeadlineLabel: getLabelInstance(
    components,
    "userTileImageHeadlineLabel",
    { labelKind: "span", text: "Profilbild" }
  ),
  userTileImageEmptyStateLabel: getLabelInstance(
    components,
    "userTileImageEmptyStateLabel",
    { labelKind: "p", text: "Wähle ein Profilbild." }
  ),
  name: getLabelInstance(components, "name", {
    labelKind: "p",
    text: "Name",
  }),
  city: getLabelInstance(components, "city", {
    labelKind: "p",
    text: "Ort",
  }),
  street: getLabelInstance(components, "street", {
    labelKind: "p",
    text: "Straße",
  }),
  email: getLabelInstance(components, "email", {
    labelKind: "p",
    text: "E-Mail",
  }),
  website: getLabelInstance(components, "website", {
    labelKind: "p",
    text: "Webseite",
  }),
  phone: getLabelInstance(components, "phone", {
    labelKind: "p",
    text: "Telefon",
  }),
  streetHintLabel: getLabelInstance(components, "streetHintLabel", {
    labelKind: "span",
    text: "(nicht sichtbar)",
  }),
  saveLabel: getLabelInstance(components, "saveLabel", {
    labelKind: "span",
    text: "speichern",
  }),
  resetLabel: getLabelInstance(components, "resetLabel", {
    labelKind: "span",
    text: "zurücksetzen",
  }),
  languagesDefinition: getLanguagesDefinition(components),
});
