import {
  getBodyInstance,
  getButtonInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IInlineNotificationComponent,
  ILabelComponent,
} from "@/modules/components";

export interface IPregnantUserCardViewDefinition {
  titleLabel: ILabelComponent;
  titleBody: IBodyComponent;
  resetButton: IButtonComponent;
  nextButton: IButtonComponent;
  imageHeadlineLabel: ILabelComponent;
  generalSaveErrorNotification: IInlineNotificationComponent;
}

export const getPregnantUserCardViewDefinition = (
  components: IComponent[]
): IPregnantUserCardViewDefinition => ({
  titleLabel: getLabelInstance(components, "titleLabel", {
    labelKind: "",
    text: "Personal Visitenkarte",
  }),
  imageHeadlineLabel: getLabelInstance(components, "imageHeadlineLabel", {
    labelKind: "",
    text: "Profilbild",
  }),
  resetButton: getButtonInstance(components, "resetButton", {
    usage: "",
    buttonKind: "ghost",
  }),
  nextButton: getButtonInstance(components, "nextButton", {
    usage: "",
    buttonKind: "ghost",
  }),

  titleBody: getBodyInstance(components, "titleBody", {
    body:
      "<p>Diese Informationen sendest du einer Hebamme mit deiner Anfrage. Sie sind für Außenstehende nicht sichtbar.</p>",
  }),

  generalSaveErrorNotification: getInlineNotificationInstance(
    components,
    "generalSaveErrorNotification",
    {
      notificationKind: "error",
      title: "Fehler beim Speichern. Prüfe die Daten und versuch es nochmal",
    }
  ),
});
