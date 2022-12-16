import { IComponent, getLabelInstance } from "@/modules/components/types";
import { IScrollToTopDefinition } from "./types";

export function getScrollToTopDefinition(
  components: IComponent[]
): IScrollToTopDefinition {
  return {
    label: getLabelInstance(components, "scrollToTop", {
      text: "nach oben",
      labelKind: "p",
    }),
  };
}
