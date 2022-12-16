import React, { useState } from "react";
import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react";
import { HediPersonRound } from "@/modules/svg";
import {
  IMenuComponent,
  isMenu,
} from "@/modules/components/types/IMenuComponent";
import { ICurrentUser } from "@/modules/auth/types";
import {
  CarbonIconType,
  User16,
  Forum16,
  Email16,
  WatsonHealthNominate16,
  Dashboard16,
  Add24,
  Subtract24,
  Partnership16,
  Logout16,
  Search16,
} from "@carbon/icons-react";
import { transformMenu } from "../UserPanel/transformMenu";
import { Image } from "@/modules/components";
import { useLogout } from "@/modules/shell/client/hooks/useLogout";

export interface IUserSideNav {
  menuItems: IMenuComponent[];
  user: ICurrentUser;
  greetingText?: string;
}

export const UserSideNavBar = (props: IUserSideNav) => {
  const { logout } = useLogout();
  const { user, menuItems, greetingText } = props;
  const { activeMenu, activeMenuHierarchy } = transformMenu(menuItems);
  const isActive = (menuItem: IMenuComponent) =>
    menuItem === activeMenu || activeMenuHierarchy?.indexOf(menuItem) !== -1;

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="hedi--user-sidenavbar">
      {/* <div
        className={`hedi--user-sidenavbar__action-wrap${
          isExpanded ? " hedi--user-sidenavbar__action-wrap--expanded" : ""
        }`}>
        <div
          className="hedi--user-sidenavbar__action"
          onClick={() => handleClick()}>
          {isExpanded ? <Subtract24 /> : <Add24 />}
        </div>
      </div> */}
      <SideNav defaultExpanded={true} isRail expanded={true}>
        <div className="hedi--user-sidenavbar__above">
          <div className="hedi--user-sidenavbar__contact-area">
            <div className="hedi--user-sidenavbar__user-image">
              {user.image ? <Image {...user.image} /> : <HediPersonRound />}
            </div>
            <div className="hedi--user-sidenavbar__user-text">
              {`${greetingText ?? ""} ${user.givenName}`}
            </div>
          </div>
          {/* <Seperator type="s" /> */}
        </div>
        <SideNavItems>
          {menuItems.map((item, index) =>
            item.components && item.components?.length > 0 ? (
              <SideNavMenu
                renderIcon={getIcon(item.renderIcon || "")}
                title={item.labelText || ""}
                isActive={isActive(item)}
                defaultExpanded={isActive(item)}
                key={item.labelText || "SideNavMenu" + index}>
                {" "}
                {item.components.map((menuItem, index) =>
                  isMenu(menuItem) ? (
                    <SideNavMenuItem
                      href={menuItem.href}
                      isActive={isActive(menuItem)}
                      key={menuItem.labelText || "SidNavMenuItem" + index}>
                      {menuItem.labelText || ""}
                    </SideNavMenuItem>
                  ) : null
                )}{" "}
              </SideNavMenu>
            ) : item.id === "logout" ? (
              <SideNavLink
                onClick={() => logout()}
                className={"hedi--user-sidenavbar__navlink"}
                renderIcon={getIcon(item.renderIcon || "")}>
                {item.labelText || ""}
              </SideNavLink>
            ) : (
              <SideNavLink
                href={item.href}
                className={
                  isActive(item)
                    ? "hedi--user-sidenavbar__navlink hedi--user-sidenavbar__navlink--active"
                    : ""
                }
                renderIcon={getIcon(item.renderIcon || "")}>
                {item.labelText || ""}
              </SideNavLink>
            )
          )}
        </SideNavItems>
      </SideNav>
    </div>
  );
};

// Define all the Icons we can use here
function getIcon(iconName: string): CarbonIconType {
  switch (iconName) {
    case "User16":
      return User16;
    case "Forum16":
      return Forum16;
    case "Email16":
      return Email16;
    case "WatsonHealthNominate16":
      return WatsonHealthNominate16;
    case "Partnership16":
      return Partnership16;
    case "Logout16":
      return Logout16;
    case "Search16":
      return Search16;
    default:
      return Dashboard16;
  }
}
