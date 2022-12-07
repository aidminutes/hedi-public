import { IMenuComponent } from "@/modules/components";

export const getActiveTabIndex = (
  items: IMenuComponent[],
  activeRoute?: string
) => items.findIndex(item => item.href == activeRoute) || 0;
