import { findMenuInstance, IComponent } from "@/modules/components/types";
import { IAccountMenuDefinition } from "./types";

export function getAccountMenuDefinition(
  components: IComponent[]
): IAccountMenuDefinition | undefined {
  const accountMenu = findMenuInstance(components, "account");
  if (accountMenu && accountMenu.components) {
    return accountMenu as IAccountMenuDefinition;
  }
  return undefined;
}
