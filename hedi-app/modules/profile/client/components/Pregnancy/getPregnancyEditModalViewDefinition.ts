import {
  getButtonInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  IButtonComponent,
  IComponent,
  IInlineNotificationComponent,
  ILabelComponent,
} from "@/modules/components";

export interface IPregnancyViewDefinition {
  saveButton: IButtonComponent;
  resetButton: IButtonComponent;
  editPregnancyTitleLabel: ILabelComponent;
  pregnancyErrorNotification: IInlineNotificationComponent;
}

export const getPregnancyEditModalViewDefinition = (
  components: IComponent[]
): IPregnancyViewDefinition => ({
  saveButton: getButtonInstance(components, "saveButton", {
    buttonKind: "primary",
    usage: "",
  }),
  resetButton: getButtonInstance(components, "resetButton", {
    buttonKind: "primary",
    usage: "",
  }),
  editPregnancyTitleLabel: getLabelInstance(
    components,
    "editPregnancyTitleLabel",
    {
      labelKind: "h2",
      text: "Schwangerschaft",
    }
  ),
  pregnancyErrorNotification: getInlineNotificationInstance(
    components,
    "pregnancyErrorNotification",
    { title: "Error", notificationKind: "error" }
  ),
});
