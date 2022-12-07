import {
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IPhoneInputProps } from "./PhoneInput";

export const getPhoneInputDefinition = (
  components: IComponent[]
): IPhoneInputProps => ({
  phoneLabel: getLabelInstance(components, "phone", {
    labelKind: "span",
    text: "Telefonnummer",
  }),
  dataKindSelect: getSelectInstance(components, "dataKindSelect", {
    items: [],
  }),
  phoneTextInput: getTextInputInstance(components, "phoneTextInput", {
    type: "text",
    labelText: "Telefonnummer",
  }),
  phoneKindSelect: getSelectInstance(components, "phoneKindSelect", {
    items: [],
  }),
  dataVisibilitySelect: getSelectInstance(components, "dataVisibilitySelect", {
    items: [],
  }),
});
