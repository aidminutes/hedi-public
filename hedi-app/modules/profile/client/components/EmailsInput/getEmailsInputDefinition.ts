import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IEmailsInputDefinition } from ".";
import { getEmailInputDefinition } from "./EmailInput";

export const getEmailsInputDefinition = (
  components: IComponent[]
): IEmailsInputDefinition => ({
  emailInputDefinition: getEmailInputDefinition(components),
  emailsLabel: getLabelInstance(components, "emailsLabel", {
    labelKind: "span",
    text: "Emails",
  }),
  addButton: getButtonInstance(components, "emailAddButton", {
    buttonKind: "primary",
    usage: "",
    text: "Email hinzufügen",
  }),
  removeButton: getButtonInstance(components, "emailRemoveButton", {
    buttonKind: "ghost",
    usage: "",
    text: "Email entfernen",
  }),
});
