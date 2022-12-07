import { IComponent, getButtonInstance } from "@/modules/components/types";
import { ISysMessageEntryDefinition } from ".";

export const getSysMessageEntryDefinition = (
  components: IComponent[]
): ISysMessageEntryDefinition => {
  return {
    markAsReadButton: getButtonInstance(components, "markAsReadButton", {
      buttonKind: "ghost",
      usage: "",
      text: "als gelesen markieren",
    }),
    dismissButton: getButtonInstance(components, "dismissButton", {
      buttonKind: "ghost",
      usage: "",
      text: "abweisen",
    }),
  };
};
