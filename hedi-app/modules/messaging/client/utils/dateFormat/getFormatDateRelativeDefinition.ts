import { getLabelInstance, IComponent } from "@/modules/components";
import { IFormatDateRelativeDefinition } from "./types";

export const getFormatDateRelativeDefinition = (
  components: IComponent[]
): IFormatDateRelativeDefinition => {
  return {
    momentsAgoText:
      getLabelInstance(components, "momentsAgo", {
        labelKind: "span",
        text: "Gerade eben",
      }).text ?? "Gerade eben",
    todayText:
      getLabelInstance(components, "today", {
        labelKind: "span",
        text: "Heute",
      }).text ?? "Heute",
    yesterdayText:
      getLabelInstance(components, "yesterday", {
        labelKind: "span",
        text: "Gestern",
      }).text ?? "Gestern",
  };
};
