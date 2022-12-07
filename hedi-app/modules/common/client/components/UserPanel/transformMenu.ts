import { IMenuComponent } from "@/modules/components/types/IMenuComponent";
import { useRouter } from "next/router";

export const transformMenu = (items?: IMenuComponent[]) => {
  const router = useRouter();
  const currentPath = router.asPath.startsWith("/" + router.locale)
    ? router.asPath
    : "/" + router.locale + router.asPath;
  const extractActiveMenu = (
    items: IMenuComponent[] | undefined,
    href: string,
    extractPath?: IMenuComponent[]
  ): undefined | [IMenuComponent, IMenuComponent[]] => {
    if (!items) return;
    extractPath = extractPath || [];
    for (let i = 0; i < items.length || 0; i++) {
      extractPath.push(items[i]);
      if (items[i].href === href) {
        return [items[i], extractPath];
      }
      const menuInChildren = extractActiveMenu(
        items[i].components as IMenuComponent[],
        href,
        extractPath
      );
      if (menuInChildren) return menuInChildren;
      extractPath.pop();
    }
  };
  const extractResult = extractActiveMenu(items, currentPath);
  const activeMenu: IMenuComponent | undefined = extractResult?.[0];
  const activeMenuHierarchy: IMenuComponent[] = extractResult?.[1] || [];
  return { activeMenu, activeMenuHierarchy };
};
