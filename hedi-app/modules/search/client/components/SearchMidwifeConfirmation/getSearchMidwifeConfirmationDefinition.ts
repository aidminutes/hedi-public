import {
  getButtonInstance,
  getGroupInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getSelectInstance,
  getTextAreaInstance,
  getToastNotificationInstance,
  getToggleInstance,
  IButtonComponent,
  IComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  ISelectComponent,
  ISelectItem,
  ITextAreaComponent,
  IToastNotificationComponent,
  IToggleComponent,
} from "@/modules/components";

export interface ISearchMidwifeConfirmationDefinition {
  headline: ILabelComponent;
  pageDescriptionLabel: ILabelComponent;
  searchedCaresLabel: ILabelComponent;
  forLabel: ILabelComponent;
  expectedDeliveryDateShortFormLabel: ILabelComponent;
  withServicesLabel: ILabelComponent;
  selectedMidwivesLabel: ILabelComponent;
  networkRequestToggle: IToggleComponent;
  networkRequestTooltipText: ILabelComponent;
  requestInformationLabel: ILabelComponent;
  freeTextTitleLabel: ILabelComponent;
  freeTextDescriptionLabel: ILabelComponent;
  freeTextTextArea: ITextAreaComponent;
  freeTextInfoLabel: ILabelComponent;
  sendButton: IButtonComponent;
  cancelButton: IButtonComponent;
  languageSelect: ISelectComponent;
  allServices: ISelectItem[];
  careTypesSelect: ISelectComponent;
  theseInfoWillBeSentLabel: ILabelComponent;
  profileCardTitleLabel: ILabelComponent;
  pregnancyTitleLabel: ILabelComponent;
  errorNotification: IToastNotificationComponent;
  duplicateRequestErrorNotification: IToastNotificationComponent;
  noRecipientNotification: IInlineNotificationComponent;
  tooLongMessageNotification: IInlineNotificationComponent;
  underCareOrHasActiveConnectionLabel: ILabelComponent;
}

export function getSearchMidwifeConfirmationDefinition(
  components: IComponent[]
): ISearchMidwifeConfirmationDefinition {
  return {
    headline: getLabelInstance(components, "comfirmationHeadlineLabel", {
      labelKind: "h2",
      text: "Sende deine Anfrage",
    }),
    pageDescriptionLabel: getLabelInstance(components, "pageDescriptionLabel", {
      labelKind: "paragraph",
      text:
        "Deine Anfrage im Überblick: Überprüfe deine Angaben auf Vollständigkeit und Richtigkeit.",
    }),
    searchedCaresLabel: getLabelInstance(components, "searchedCaresLabel", {
      labelKind: "h4",
      text: "1. Gesuchte Betreuung",
    }),
    forLabel: getLabelInstance(components, "forLabel", {
      labelKind: "span",
      text: "für:",
    }),
    expectedDeliveryDateShortFormLabel: getLabelInstance(
      components,
      "expectedDeliveryDateShortFormLabel",
      {
        labelKind: "span",
        text: "ET",
      }
    ),
    withServicesLabel: getLabelInstance(components, "withServicesLabel", {
      labelKind: "span",
      text: "mit den Leistungen:",
    }),
    selectedMidwivesLabel: getLabelInstance(
      components,
      "selectedMidwivesLabel",
      {
        labelKind: "h4",
        text: "2. Ausgewählte Hebammen",
      }
    ),
    networkRequestToggle: getToggleInstance(
      components,
      "networkRequestToggle",
      {
        labelText: "",
        labelA: "Ja, ich möchte meine Anfrage als Netzwerk-Anfrage senden",
        labelB: "Ja, ich möchte meine Anfrage als Netzwerk-Anfrage senden",
      }
    ),
    networkRequestTooltipText: getLabelInstance(
      components,
      "networkRequestTooltipText",
      {
        labelKind: "p",
        text:
          "Sende deine Anfrage an das Hebammen-Netzwerk, um Hebammen zu erreichen, die kurzfristig freie Kapazitäten haben oder bereit sind, eine zusätzliche Klientin anzunehmen.",
      }
    ),
    requestInformationLabel: getLabelInstance(
      components,
      "requestInformationLabel",
      {
        labelKind: "h4",
        text: "3. Deine Anfrage-Informationen",
      }
    ),
    freeTextTitleLabel: getLabelInstance(components, "freeTextTitleLabel", {
      labelKind: "h4",
      text: "4. Ergänzende Informationen",
    }),
    freeTextDescriptionLabel: getLabelInstance(
      components,
      "freeTextDescriptionLabel",
      {
        labelKind: "span",
        text:
          "Dies sollten die Hebammen noch zu mir oder über meine Schwangerschaft wissen:",
      }
    ),
    freeTextTextArea: getTextAreaInstance(components, "freeTextTextArea", {
      placeholder: "Liebe  Hebammen, ...",
    }),
    freeTextInfoLabel: getLabelInstance(components, "freeTextInfoLabel", {
      labelKind: "span",
      text: "Diese Nachricht wird nicht übersetzt.",
    }),
    sendButton: getButtonInstance(components, "sendButton", {
      buttonKind: "primary",
      text: "Anfragen senden",
      usage: "",
    }),
    cancelButton: getButtonInstance(components, "cancelButton", {
      buttonKind: "ghost",
      text: "Anfrage abbrechen",
      usage: "",
    }),
    languageSelect: getSelectInstance(components, "languageSelect", {
      items: [],
    }),
    careTypesSelect: getSelectInstance(components, "careTypesSelect", {
      items: [],
    }),
    allServices: (getGroupInstance(components, "serviceSelect", {
      usage: "",
      components: [],
    }).components as ISelectComponent[]).flatMap(sel => sel.items),
    theseInfoWillBeSentLabel: getLabelInstance(
      components,
      "theseInfoWillBeSentLabel",
      {
        labelKind: "span",
        text: "Diese Informationen werden mit deiner Anfrage versendet.",
      }
    ),
    profileCardTitleLabel: getLabelInstance(
      components,
      "profileCardTitleLabel",
      {
        labelKind: "span",
        text: "Visitenkarte",
      }
    ),
    pregnancyTitleLabel: getLabelInstance(
      components,
      "userTilePregnancyHeadline",
      {
        labelKind: "span",
        text: "Schwangerschaft",
      }
    ),
    errorNotification: getToastNotificationInstance(
      components,
      "errorNotification",
      {
        notificationKind: "error",
        title: "Fehler",
        subtitle: "Fehler aufgetreten. Bitte versuch es nochmal",
      }
    ),
    duplicateRequestErrorNotification: getToastNotificationInstance(
      components,
      "duplicateRequestErrorNotification",
      {
        notificationKind: "error",
        title: "Diese Hebamme(n) hast du schon beanfragt",
      }
    ),
    noRecipientNotification: getInlineNotificationInstance(
      components,
      "noRecipientNotification",
      {
        notificationKind: "error",
        title: "Du hast keine Hebamme ausgewählt",
      }
    ),
    tooLongMessageNotification: getInlineNotificationInstance(
      components,
      "tooLongMessageNotification",
      {
        notificationKind: "error",
        title: "Die Nachricht ist sehr long",
      }
    ),
    underCareOrHasActiveConnectionLabel: getLabelInstance(
      components,
      "underCareOrHasActiveConnectionLabel",
      {
        labelKind: "span",
        text: "betreut oder angefragt",
      }
    ),
  };
}
