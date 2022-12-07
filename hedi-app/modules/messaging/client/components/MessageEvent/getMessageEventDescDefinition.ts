import { getLabelInstance, IComponent } from "@/modules/components";
import { IMessageEventDescDefinition } from "./types";

export const getMessageEventDescDefinition = (
  components: IComponent[]
): IMessageEventDescDefinition => {
  return {
    fileText:
      getLabelInstance(components, "file", {
        labelKind: "span",
        text: "Datei",
      }).text ?? "Datei",
    imageText:
      getLabelInstance(components, "image", {
        labelKind: "span",
        text: "Bild",
      }).text ?? "Bild",
    hediLinkText:
      getLabelInstance(components, "hediLink", {
        labelKind: "span",
        text: "HEDI Link",
      }).text ?? "HEDI Link",
  };
};
