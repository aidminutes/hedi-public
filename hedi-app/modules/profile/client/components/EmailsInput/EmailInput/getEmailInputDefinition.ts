import {
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IEmailInputProps } from "./EmailInput";

export const getEmailInputDefinition = (
  components: IComponent[]
): IEmailInputProps => ({
  emailLabel: getLabelInstance(components, "email", {
    labelKind: "span",
    text: "Email",
  }),
  dataKindSelect: getSelectInstance(components, "dataKindSelect", {
    items: [],
  }),
  emailTextInput: getTextInputInstance(components, "emailTextInput", {
    type: "text",
    labelText: "Email",
  }),
  dataVisibilitySelect: getSelectInstance(components, "dataVisibilitySelect", {
    items: [],
  }),
});
