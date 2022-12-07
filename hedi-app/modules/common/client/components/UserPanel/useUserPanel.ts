import { useUser } from "@/modules/auth/client/hooks";
import {
  IMenuComponent,
  isMenu,
} from "@/modules/components/types/IMenuComponent";
import { useAccountMenu } from "@/modules/shell/client/components/Header/AccountMenu";
import { transformMenu } from "./transformMenu";

export const useUserPanel = () => {
  const [user, userIsLoading] = useUser();
  const { accountMenu } = useAccountMenu();
  const userMenuItems = accountMenu?.components as IMenuComponent[] | undefined;
  const { activeMenu, activeMenuHierarchy } = transformMenu(userMenuItems);
  let menuTabItems: IMenuComponent[] | undefined = undefined;
  if (activeMenu && activeMenuHierarchy) {
    const activeMenuParentIndex = activeMenuHierarchy.indexOf(activeMenu) - 1;
    if (activeMenuParentIndex >= 0)
      menuTabItems = activeMenuHierarchy[
        activeMenuParentIndex
      ].components?.filter(component => isMenu(component)) as IMenuComponent[];
  }
  return { user, userMenuItems, activeMenu, menuTabItems };
};
