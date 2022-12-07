import { IComponent, getMenuInstance } from "@/modules/components/types";
import { ILanguageSwitchActionDefinition } from "./types";

export function getLanguageSwitchActionDefinition(
  components: IComponent[]
): ILanguageSwitchActionDefinition {
  return getMenuInstance(components, "languageSwitch", {});
}
