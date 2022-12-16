import {
  getBodyInstance,
  getButtonInstance,
  getLabelInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  ILabelComponent,
} from "@/modules/components";

export interface ITransiotionDialog {
  chatConfirmationHeader: ILabelComponent;
  chatConfirmationBody: IBodyComponent;

  chatConfirmationOkButton: IButtonComponent;
  chatConfirmationCancelButton: IButtonComponent;
}

export const getChatConfirmationModalDefinition = (
  components: IComponent[]
): ITransiotionDialog => ({
  chatConfirmationHeader: getLabelInstance(
    components,
    "chatConfirmationHeader",
    {
      labelKind: "span",
      text: "Chat-Bestätigung",
    }
  ),

  chatConfirmationBody: getBodyInstance(components, "chatConfirmationBody", {
    body: "<p>Möchten Sie einen Chat mit der ausgewählten Person beginnen?</p>",
  }),

  chatConfirmationOkButton: getButtonInstance(
    components,
    "chatConfirmationOkButton",
    {
      text: "chat starten",
      usage: "",
      buttonKind: "primary",
    }
  ),
  chatConfirmationCancelButton: getButtonInstance(components, "chatConfirmationCancelButton", {
    text: "abbrechen",
    usage: "",
    buttonKind: "secondary",
  }),
});
