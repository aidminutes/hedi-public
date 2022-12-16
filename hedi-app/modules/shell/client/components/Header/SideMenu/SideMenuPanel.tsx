import Link from "next/link";
import {
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderMenu,
  HeaderMenuItem,
  Link as CarbonLink,
} from "carbon-components-react";
import { IMenuComponent, isMenu } from "@/modules/components";
import { ISideMenuPanel } from "./types";
import React from "react";
import { useLogout } from "../../../hooks/useLogout";
import { loginTokenAPIUrl } from "@/modules/messaging/types";
import { logout } from "@/modules/auth/client";

export const SideMenuPanel = (props: ISideMenuPanel) => {
  const { logout } = useLogout();
  const { backToHome, mainMenu, accountMenu, footer, ...rest } = props;
  return (
    <SideNav aria-label="Side navigation" isPersistent={false} {...rest}>
      <SideNavItems>
        <SideMenuGroup menu={backToHome} hasDivider />
        <SideMenuGroup menu={mainMenu} hasDivider />
        <SideMenuGroup menu={accountMenu} hasDivider />
        <SideMenuGroup menu={footer} />)
      </SideNavItems>
    </SideNav>
  );
};

const SideMenuGroup = ({
  menu,
  hasDivider,
}: {
  menu?: IMenuComponent;
  hasDivider?: boolean;
}) => {
  if (!menu) return null;
  else {
    return (
      <HeaderSideNavItems hasDivider={hasDivider}>
        {menu.components && menu.components.length > 0 ? (
          menu.components
            .filter(isMenu)
            .map(item => <SideMenuItem {...item} key={item.labelText} />)
        ) : (
          <SideMenuItem {...menu} />
        )}
      </HeaderSideNavItems>
    );
  }
};

const SideMenuItem = React.forwardRef((menu: IMenuComponent, ref) => {
  // NOTE carbon components don't support nesting more than one level out of the box
  // probably needs our own implementation if the need arises
  if (menu.components && menu.components.length > 0) {
    return (
      <HeaderMenu
        title={menu.labelText}
        aria-label={menu.labelText}
        menuLinkName={menu.labelText ?? ""}
        key={menu.labelText}
        ref={ref as (element: HTMLElement) => void}>
        {menu.components.filter(isMenu).map(item => (
          <SideMenuItem {...item} key={item.labelText} ref={ref} />
        ))}
      </HeaderMenu>
    );
  } else if (menu.href) {
    if (menu.usage === "generalTerms") {
      return (
        <CarbonLink
          href={"/aidminutes_agb_hedi.pdf"}
          target={"_blank"}
          key={menu.labelText}>
          <HeaderMenuItem title={menu.labelText} ref={ref}>
            {menu.labelText ?? ""}
          </HeaderMenuItem>
        </CarbonLink>
      );
    } else {
      return (
        <Link href={menu.href} passHref key={menu.labelText}>
          <HeaderMenuItem title={menu.labelText} ref={ref}>
            {menu.labelText ?? ""}
          </HeaderMenuItem>
        </Link>
      );
    }
  } else if (menu.id === "logout") {
    return (
      <div
        className="hedi--side-nav__item hedi--user-sidenavbar__navlink"
        title={menu.labelText}
        key={menu.labelText}
        onClick={() => logout()}>
        {menu.labelText ?? ""}
      </div>
    );
  } else {
    return (
      <div
        className="hedi--side-nav__item"
        title={menu.labelText}
        key={menu.labelText}>
        {menu.labelText ?? ""}
      </div>
    );
  }
});
