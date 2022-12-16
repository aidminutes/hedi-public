import {
  getBodyInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getTextInputInstance,
  IBodyComponent,
  IComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  ITextInputComponent,
} from "@/modules/components";

export interface IEditPerson {
  editPersonIntroBody: IBodyComponent;
  givenNameTextInput: ITextInputComponent;
  familyNameTextInput: ITextInputComponent;
  namePrefixTextInput: ITextInputComponent;
  cityTextInput: ITextInputComponent;
  postalCodeTextInput: ITextInputComponent;
  streetTextInput: ITextInputComponent;
  streetNumberTextInput: ITextInputComponent;
  requiredTextPerson: ILabelComponent;
  explanationBodyPerson: IBodyComponent;
  modalPersonHeadlineLabel: ILabelComponent;
  invalidGivenNameLabel: ILabelComponent;
  invalidFamilyNameLabel: ILabelComponent;
  invalidPostalCodeLabel: ILabelComponent;
  invalidCityLabel: ILabelComponent;
  errorNotification: IInlineNotificationComponent;
}

export const getProfilePersonEditModalDefinition = (
  components: IComponent[]
): IEditPerson => ({
  editPersonIntroBody: getBodyInstance(components, "editPersonIntroBody", {
    body: "<p>Wer bist du? Von welcher Adresse startest du?</p>",
  }),
  requiredTextPerson: getLabelInstance(components, "requiredTextPerson", {
    labelKind: "p",
    text:
      "* Diese Angaben werden benötigt, damit deine Visitenkarte gefunden werden kann.",
  }),
  explanationBodyPerson: getBodyInstance(components, "explanationBodyPerson", {
    body:
      "<p>HEDI nutzt deine Adresse nur intern für die Berechnung der Distanz zu deinen Klient:innen. Sie wird niemals öffentlich gezeigt.</p>",
  }),
  familyNameTextInput: getTextInputInstance(components, "familyNameTextInput", {
    type: "text",
    labelText: "Nachname",
  }),
  givenNameTextInput: getTextInputInstance(components, "givenNameTextInput", {
    type: "text",
    labelText: "Vorname",
  }),
  namePrefixTextInput: getTextInputInstance(components, "namePrefixTextInput", {
    type: "text",
    labelText: "Titel",
  }),
  cityTextInput: getTextInputInstance(components, "cityTextInput", {
    type: "text",
    labelText: "Ort",
  }),
  postalCodeTextInput: getTextInputInstance(components, "postalCodeTextInput", {
    type: "text",
    labelText: "Postleitzahl",
    isRequired: true,
  }),
  streetTextInput: getTextInputInstance(components, "streetTextInput", {
    type: "text",
    labelText: "Straße",
  }),
  streetNumberTextInput: getTextInputInstance(
    components,
    "streetNumberTextInput",
    { type: "text", labelText: "Hausnummer" }
  ),
  modalPersonHeadlineLabel: getLabelInstance(
    components,
    "modalPersonHeadlineLabel",
    { labelKind: "h3", text: "Zu deiner Person" }
  ),
  invalidPostalCodeLabel: getLabelInstance(
    components,
    "invalidPostalCodeLabel",
    {
      labelKind: "p",
      text: "ungültige Postleitzahl",
    }
  ),
  invalidCityLabel: getLabelInstance(components, "invalidCityLabel", {
    labelKind: "p",
    text: "Bitte Ort eingeben",
  }),
  invalidGivenNameLabel: getLabelInstance(components, "invalidGivenNameLabel", {
    labelKind: "p",
    text: "Bitte Vornamen eingeben",
  }),
  invalidFamilyNameLabel: getLabelInstance(
    components,
    "invalidFamilyNameLabel",
    {
      labelKind: "p",
      text: "Bitte Nachnamen eingeben",
    }
  ),
  errorNotification: getInlineNotificationInstance(
    components,
    "errorNotification",
    {
      notificationKind: "error",
      title: "Es ist ein Fehler aufgetreten.",
    }
  ),
});
