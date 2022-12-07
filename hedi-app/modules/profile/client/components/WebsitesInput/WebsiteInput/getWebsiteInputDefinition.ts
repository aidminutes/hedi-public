import {
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IWebsiteInputProps } from "./WebsiteInput";

export const getWebsiteInputDefinition = (
  components: IComponent[]
): IWebsiteInputProps => ({
  websiteLabel: getLabelInstance(components, "website", {
    labelKind: "span",
    text: "Webseite",
  }),
  dataKindSelect: getSelectInstance(components, "dataKindSelect", {
    items: [],
  }),
  websiteTextInput: getTextInputInstance(components, "websiteTextInput", {
    type: "text",
    labelText: "URL",
  }),
  dataVisibilitySelect: getSelectInstance(components, "dataVisibilitySelect", {
    items: [],
  }),
});
