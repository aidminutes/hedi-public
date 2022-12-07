import React from "react";
import { IMenuComponent } from "@/modules/components";
import { Tabs, Tab } from "carbon-components-react";
import { getActiveTabIndex } from "./menuUtils";
import { useRouter } from "next/router";

export interface MenuTabProps {
  items: IMenuComponent[];
  className?: string;
  activeRoute?: string;
}

export const MenuTab: React.FC<MenuTabProps> = ({
  items,
  className,
  activeRoute,
}) => {
  const currentTabIndex = getActiveTabIndex(items, activeRoute);
  const router = useRouter();
  return (
    <div className="hedi--menu-tabs">
      <Tabs className={className} selected={currentTabIndex}>
        {items.map((menuItem, index) =>
          menuItem.href ? (
            <Tab
              label={menuItem.labelText}
              onClick={() => router.push(menuItem.href || "")}
              key={menuItem.labelText || "MenuTab" + index}></Tab>
          ) : (
            <Tab label={menuItem.labelText} disabled></Tab>
          )
        )}
      </Tabs>
    </div>
  );
};
