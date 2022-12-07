import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IWebsitesInputDefinition } from ".";
import { getWebsiteInputDefinition } from "./WebsiteInput";

export const getWebsitesInputDefinition = (
  components: IComponent[]
): IWebsitesInputDefinition => ({
  websiteInputDefinition: getWebsiteInputDefinition(components),
  websitesLabel: getLabelInstance(components, "websitesLabel", {
    labelKind: "span",
    text: "Webseiten",
  }),
  addButton: getButtonInstance(components, "websiteAddButton", {
    buttonKind: "primary",
    usage: "",
    text: "Webseite hinzufügen",
  }),
  removeButton: getButtonInstance(components, "websiteRemoveButton", {
    buttonKind: "ghost",
    usage: "",
    text: "Webseite entfernen",
  }),
});
