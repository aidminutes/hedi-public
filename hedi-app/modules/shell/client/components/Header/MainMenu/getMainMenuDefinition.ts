import {
  findMenuInstance,
  IComponent,
  IMenuComponent,
  isMenu,
  isSelectInstance,
} from "@/modules/components/types";
import { transformCategoryMenu } from "./transformCategoryMenu";
import { IMainMenuDefinition } from "./types";

export function getMainMenuDefinition(
  components: IComponent[]
): IMainMenuDefinition | undefined {
  const mainMenu = findMenuInstance(components, "main");
  if (mainMenu && mainMenu.components) {
    mainMenu.components = transformMenu(mainMenu.components);
    return mainMenu as IMainMenuDefinition;
  }
  return undefined;
}

function transformMenu(components: IComponent[]): IMenuComponent[] {
  return components.flatMap(component => {
    if (isMenu(component)) {
      if (component.components)
        component.components = transformMenu(component.components);
      return component;
    } else if (isSelectInstance(component, "categories")) {
      return transformCategoryMenu(component);
    } else {
      return [];
    }
  });
}
