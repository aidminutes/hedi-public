import {
  getButtonInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getNumberInputInstance,
  getToggleInstance,
  IButtonComponent,
  IComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  INumberInputComponent,
  IToggleComponent,
} from "@/modules/components";

export interface IProfileCapacityEditModalViewDefinition {
  searchableToggle: IToggleComponent;
  networkRequestToggle: IToggleComponent;
  directRequestToggle: IToggleComponent;
  maxDistanceLabel: ILabelComponent;
  etsPerMonthLabel: ILabelComponent;
  editCapacityTitleLabel: ILabelComponent;
  editCapacityDescriptionLabel: ILabelComponent;
  editSearchContactDescription: ILabelComponent;
  editDirectContactDescription: ILabelComponent;
  editNetworkRequestDescription: ILabelComponent;
  editMaxDistanceDescription: ILabelComponent;
  editEtsPerMonthDescription: ILabelComponent;
  saveButton: IButtonComponent;
  cancelButton: IButtonComponent;
  etsPerMonthNumberInput: INumberInputComponent;
  maxDistanceNumberInput: INumberInputComponent;
  invalidNumberInputLabel: ILabelComponent;
  capacityErrorNotification: IInlineNotificationComponent;
}

export const getProfileCapacityEditModalViewDefinition = (
  components: IComponent[]
): IProfileCapacityEditModalViewDefinition => ({
  maxDistanceLabel: getLabelInstance(components, "maxDistanceLabel", {
    labelKind: "span",
    text: "Maximale Entfernung",
  }),
  etsPerMonthLabel: getLabelInstance(components, "etsPerMonthLabel", {
    labelKind: "span",
    text: "ETs pro Monat",
  }),
  editCapacityTitleLabel: getLabelInstance(
    components,
    "editCapacityTitleLabel",
    {
      labelKind: "Label",
      text: "Nutzung und Betreuungskapazitäten",
    }
  ),
  editCapacityDescriptionLabel: getLabelInstance(
    components,
    "editCapacityDescriptionLabel",
    {
      labelKind: "Paragraph",
      text:
        "Entscheide, wie du HEDI nutzen möchtest. Plane deine Fahrtwege und die Anzahl möglicher Betreuungen.",
    }
  ),
  editSearchContactDescription: getLabelInstance(
    components,
    "editSearchContactDescription",
    {
      labelKind: "Paragraph",
      text:
        "Mit einem sichtbaren Profil auf HEDI bist du in der Kontaktsuche und ggf. unter passenden Artikeln mit deiner Visitenkarte sichtbar.",
    }
  ),
  editDirectContactDescription: getLabelInstance(
    components,
    "editDirectContactDescription",
    {
      labelKind: "Paragraph",
      text:
        "Mit dem der Aktivierung hilfst du den Nutzerninnen, dich im Hebammen-Matching zu finden, um dir Betreuungsanfragen zu senden.",
    }
  ),
  editNetworkRequestDescription: getLabelInstance(
    components,
    "editNetworkRequestDescription",
    {
      labelKind: "Paragraph",
      text:
        "Wenn Du die Netzwerkfunktion aktiviertst, erhältst du besonders gut zu dir passende Anfragen, die sich in der Nähe zu deinen angenommenen Betreuungen befinden. Dieser Status wirkt sich nicht auf deine Sichtbarkeit aus.",
    }
  ),
  editMaxDistanceDescription: getLabelInstance(
    components,
    "editMaxDistanceDescription",
    {
      labelKind: "Paragraph",
      text:
        "Was ist die maximale Distanz, die du zu deinen Klientinnen zurücklegen möchtest?",
    }
  ),
  editEtsPerMonthDescription: getLabelInstance(
    components,
    "editEtsPerMonthDescription",
    {
      labelKind: "Paragraph",
      text:
        "Was ist die maximale Anzal an Entbindungsterminen, die du im Durchschnitt in einem Monat betreuuen möchtest?",
    }
  ),
  invalidNumberInputLabel: getLabelInstance(
    components,
    "invalidNumberInputLabel",
    {
      labelKind: "span",
      text: "Bitte wähle einen gültigen Wert.",
    }
  ),
  saveButton: getButtonInstance(components, "saveButton", {
    usage: "",
    buttonKind: "primary",
  }),
  cancelButton: getButtonInstance(components, "cancelButton", {
    usage: "",
    buttonKind: "ghost",
  }),
  capacityErrorNotification: getInlineNotificationInstance(
    components,
    "capacityErrorNotification",
    {
      notificationKind: "error",
      title: "Fehler beim Speichern. Prüfe die Daten und versuch es nochmal",
    }
  ),
  searchableToggle: getToggleInstance(components, "searchableToggle", {
    labelText: "",
  }),
  networkRequestToggle: getToggleInstance(components, "networkRequestToggle", {
    labelText: "",
  }),
  directRequestToggle: getToggleInstance(components, "directRequestToggle", {
    labelText: "",
  }),
  etsPerMonthNumberInput: getNumberInputInstance(
    components,
    "etsPerMonthNumberInput",
    {
      value: 0,
      min: 0,
      max: 100,
    }
  ),
  maxDistanceNumberInput: getNumberInputInstance(
    components,
    "maxDistanceNumberInput",
    {
      value: 0,
      min: 0,
      max: 100,
    }
  ),
});
