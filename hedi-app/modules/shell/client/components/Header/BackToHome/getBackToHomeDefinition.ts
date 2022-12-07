import { IComponent, getMenuInstance } from "@/modules/components/types";
import { IBackToHomeDefinition } from "./types";

export function getBackToHomeDefinition(
  components: IComponent[]
): IBackToHomeDefinition {
  const menu = getMenuInstance(components, "backToHome", {
    labelText: "Startseite",
  });

  return menu as IBackToHomeDefinition;
}
