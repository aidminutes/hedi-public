import {
  findMenuInstance,
  IComponent,
  isMenu,
} from "@/modules/components/types";
import { transformAppVersionMenu } from "./transformAppVersionMenu";
import { IFooterDefinition } from "./types";

export function getFooterDefinition(
  components: IComponent[]
): IFooterDefinition | undefined {
  const footerMenu = findMenuInstance(components, "footer");
  if (footerMenu && footerMenu.components) {
    footerMenu.components = footerMenu.components
      .filter(isMenu)
      .map(menu => transformAppVersionMenu(menu));
    return footerMenu as IFooterDefinition;
  }
  return undefined;
}
