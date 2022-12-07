import {
  getBodyInstance,
  getButtonInstance,
  getDatePickerInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getLinkInstance,
  getNumberInputInstance,
  getToastNotificationInstance,
  getToggleInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IDatePickerComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  ILinkComponent,
  INumberInputComponent,
  IToastNotificationComponent,
  IToggleComponent,
} from "@/modules/components";

export interface IPregnancyViewDefinition {
  introBody: IBodyComponent;
  myPregnancyHeadline: ILabelComponent;
  expectedDeliveryDatePicker: IDatePickerComponent;
  multiplePregnancyToggle: IToggleComponent;
  birthDateDatePicker: IDatePickerComponent;

  gravidaNumberInput: INumberInputComponent;
  paraNumberInput: INumberInputComponent;
  prevPrematureBirthToggle: IToggleComponent;
  prevBirthComplicationToggle: IToggleComponent;
  prevCSectionToggle: IToggleComponent;
  prevPostpartumDepressionToggle: IToggleComponent;
  prevBreastfeedingProblemToggle: IToggleComponent;

  errorNotification: IToastNotificationComponent;
  successNotification: IToastNotificationComponent;
  saveButton: IButtonComponent;
  redirectLink: ILinkComponent;
  nextButton: IButtonComponent;
  resetButton: IButtonComponent;

  negativeAnswerLabel: ILabelComponent;
  positiveAnswerLabel: ILabelComponent;
  yourAgeLabel: ILabelComponent;
  expectedDeliveryDateLabel: ILabelComponent;
  estimatedDateText: ILabelComponent;
  multiplePregnancyLabel: ILabelComponent;
  prevPregnanciesHeadline: ILabelComponent;
  gravidaHeadline: ILabelComponent;
  prevBirthLabel: ILabelComponent;
  paraLabel: ILabelComponent;
  prematureBirthLabel: ILabelComponent;
  prevBirthComplicationLabel: ILabelComponent;
  cSectionLabel: ILabelComponent;
  postpartumDepressionLabel: ILabelComponent;
  breastfeedingProblemLabel: ILabelComponent;

  userTilePregnancyHeadline: ILabelComponent;
  userTilePregnancyStateLabel: ILabelComponent;
  userTileHealthDataHeadline: ILabelComponent;
  userTileHealthdataStateLabel: ILabelComponent;
  yearsOldLabel: ILabelComponent;
  expectedDeliveryDateDescription: ILabelComponent;
  requiredFieldsLabel: ILabelComponent;
  lostPrevPregnanciesInfoNotification: IInlineNotificationComponent;
  gravidaLessThanParaErrorMessage: ILabelComponent;
  healthIntroBody: IBodyComponent;
  noPregnancyInlineNotification: IInlineNotificationComponent;

  pregnancyWeekLabel: ILabelComponent;
}

export const getPregnancyViewDefinition = (
  components: IComponent[]
): IPregnancyViewDefinition => ({
  introBody: getBodyInstance(components, "introBody", {
    body:
      "Vervollständige deine Schwangerschaftsprofil, um deiner potentiellen Hebamme alle relevanten Informationen zu übermitteln.",
  }),
  myPregnancyHeadline: getLabelInstance(components, "myPregnancyHeadline", {
    labelKind: "h3",
    text: "Das Wichtigstigste zu deiner Schwangerschaft.",
  }),
  expectedDeliveryDatePicker: getDatePickerInstance(
    components,
    "expectedDeliveryDatePicker",
    { datePickerType: "single", dateFormat: "d.m.Y" }
  ),
  birthDateDatePicker: getDatePickerInstance(
    components,
    "birthDateDatePicker",
    { datePickerType: "single", dateFormat: "d.m.Y" }
  ),
  multiplePregnancyToggle: getToggleInstance(
    components,
    "multiplePregnancyToggle",
    { labelText: "Mehrlingsschwangerschaft?" }
  ),

  gravidaNumberInput: getNumberInputInstance(components, "gravidaNumberInput", {
    value: 0,
  }),
  paraNumberInput: getNumberInputInstance(components, "paraNumberInput", {
    value: 0,
  }),
  prevPrematureBirthToggle: getToggleInstance(
    components,
    "prevPrematureBirthToggle",
    { labelText: "" }
  ),
  prevBirthComplicationToggle: getToggleInstance(
    components,
    "prevBirthComplicationToggle",
    { labelText: "" }
  ),
  prevCSectionToggle: getToggleInstance(components, "prevCSectionToggle", {
    labelText: "",
  }),
  prevPostpartumDepressionToggle: getToggleInstance(
    components,
    "prevPostpartumDepressionToggle",
    { labelText: "" }
  ),
  prevBreastfeedingProblemToggle: getToggleInstance(
    components,
    "prevBreastfeedingProblemToggle",
    { labelText: "" }
  ),

  errorNotification: getToastNotificationInstance(
    components,
    "errorNotification",
    { title: "Error", notificationKind: "error" }
  ),
  noPregnancyInlineNotification: getInlineNotificationInstance(
    components,
    "noPregnancyInlineNotification",
    {
      title:
        "Hinweis: Du kannst gerade keine Hebamme anfragen. Vervollständige die Informationen zur aktuellen Schwangerschaft, um Anfragen stellen zu können.",
      notificationKind: "info",
    }
  ),
  successNotification: getToastNotificationInstance(
    components,
    "successNotification",
    { title: "Success", notificationKind: "success" }
  ),
  lostPrevPregnanciesInfoNotification: getInlineNotificationInstance(
    components,
    "lostPrevPregnanciesInfoNotification",
    {
      title: "Achtung",
      notificationKind: "error",
      subtitle:
        "Beim Speichern gehen Informationen zu vorherigen Geburten verloren.",
    }
  ),
  saveButton: getButtonInstance(components, "savePregnancyButton", {
    buttonKind: "primary",
    usage: "",
  }),
  redirectLink: getLinkInstance(components, "midwifeSearchLink", {
    labelText: "Link",
    href: "/",
  }),
  negativeAnswerLabel: getLabelInstance(components, "negativeAnswerLabel", {
    labelKind: "span",
    text: "nein",
  }),
  positiveAnswerLabel: getLabelInstance(components, "positiveAnswerLabel", {
    labelKind: "span",
    text: "ja",
  }),
  yourAgeLabel: getLabelInstance(components, "yourAgeLabel", {
    labelKind: "label",
    text: "Dein Alter",
  }),
  expectedDeliveryDateLabel: getLabelInstance(
    components,
    "expectedDeliveryDateLabel",
    { labelKind: "label", text: "Errechneter Geburtstermin" }
  ),
  estimatedDateText: getLabelInstance(
    components,
    "estimatedDateText",
    { labelKind: "label", text: "ET" }
  ),
  multiplePregnancyLabel: getLabelInstance(
    components,
    "multiplePregnancyLabel",
    { labelKind: "label", text: "Mehrlingsschwangerschaft" }
  ),
  prevPregnanciesHeadline: getLabelInstance(
    components,
    "prevPregnanciesHeadline",
    {
      labelKind: "h3",
      text: "Vorherige Schwangerschaften",
    }
  ),
  gravidaHeadline: getLabelInstance(
    components,
    "gravidaHeadline",
    {
      labelKind: "h3",
      text: "Gravida",
    }
  ),
  prematureBirthLabel: getLabelInstance(components, "prematureBirthLabel", {
    labelKind: "label",
    text: "Frühgeburt",
  }),
  prevBirthLabel: getLabelInstance(components, "prevBirthLabel", {
    labelKind: "label",
    text: "Vorherige Geburt",
  }),
  paraLabel: getLabelInstance(components, "paraLabel", {
    labelKind: "label",
    text: "Para",
  }),
  prevBirthComplicationLabel: getLabelInstance(
    components,
    "prevBirthComplicationLabel",
    { labelKind: "label", text: "Vorherige Komplikationen" }
  ),
  cSectionLabel: getLabelInstance(components, "cSectionLabel", {
    labelKind: "label",
    text: "Kaiserschnitt",
  }),
  postpartumDepressionLabel: getLabelInstance(
    components,
    "postpartumDepressionLabel",
    { labelKind: "label", text: "Wochenbett-Depression" }
  ),
  breastfeedingProblemLabel: getLabelInstance(
    components,
    "breastfeedingProblemLabel",
    { labelKind: "label", text: "Stillprobleme" }
  ),
  userTilePregnancyHeadline: getLabelInstance(
    components,
    "userTilePregnancyHeadline",
    { labelKind: "h3", text: "Schwangerschaft" }
  ),
  userTilePregnancyStateLabel: getLabelInstance(
    components,
    "userTilePregnancyStateLabel",
    { labelKind: "span", text: "Informationen zur aktuellen Schwangerschaft" }
  ),
  userTileHealthDataHeadline: getLabelInstance(
    components,
    "userTileHealthDataHeadline",
    { labelKind: "h3", text: "Gesundheitsfragen" }
  ),
  userTileHealthdataStateLabel: getLabelInstance(
    components,
    "userTileHealthdataStateLabel",
    {
      labelKind: "span",
      text: "Gesundheitsfragen zu vorherigen Schwangerschaften",
    }
  ),
  yearsOldLabel: getLabelInstance(components, "yearsOldLabel", {
    labelKind: "span",
    text: "Jahre",
  }),
  expectedDeliveryDateDescription: getLabelInstance(
    components,
    "expectedDeliveryDateDescription",
    {
      labelKind: "paragraph",
      text: "Ist dein Kind bereits auf der Welt? Dann gib das Geburtsdatum an.",
    }
  ),
  requiredFieldsLabel: getLabelInstance(components, "requiredFieldsLabel", {
    labelKind: "label",
    text:
      "* Diese Angaben werden benötigt, damit du eine Betreuungsanfrage an eine Hebamme stellen kannst.",
  }),
  gravidaLessThanParaErrorMessage: getLabelInstance(
    components,
    "gravidaLessThanParaErrorMessage",
    {
      labelKind: "span",
      text: "Überprüfe die Anzahl der Schwangerschaften und Geburten",
    }
  ),
  healthIntroBody: getBodyInstance(components, "healthIntroBody", {
    body:
      "Beantworte die folgenden Gesundheitsfragen zu vorigen Schwangerschaften. Die Antworten sind für eine Hebamme wichtig, um zu prüfen, ob sie dich betreuen kann.",
  }),
  resetButton: getButtonInstance(components, "resetButton", {
    usage: "",
    buttonKind: "ghost",
    labelText: "zurücksetzen",
  }),
  nextButton: getButtonInstance(components, "nextButton", {
    usage: "",
    buttonKind: "primary",
    labelText: "weiter",
  }),
  pregnancyWeekLabel: getLabelInstance(components, "pregnancyWeekLabel", {
    labelKind:"span", text:"Schwangerschaftswoche"
  })
});
