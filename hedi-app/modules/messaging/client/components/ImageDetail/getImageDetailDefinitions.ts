import { getButtonInstance, IComponent } from "@/modules/components";
import { IImageDetailDefinition } from "./types";

export const getCallImageDetailDefinition = (
  components: IComponent[]
): IImageDetailDefinition => {
  return {
    closeButton: getButtonInstance(components, "close", {
      buttonKind: "tertiary",
      usage: "closeImageDetail",
      iconDescription: "Schließen",
    }),
  };
};
