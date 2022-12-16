import React from "react";
import Link from "next/link";
import { HeaderMenu, HeaderMenuItem } from "carbon-components-react";
import { IMenuComponent, isMenu } from "@/modules/components";
import { IMainMenuProps } from "./types";

export const MainMenu = React.forwardRef(
  ({ components }: IMainMenuProps, ref) => {
    return (
      <>
        {components.filter(isMenu).map(m => (
          <MainMenuItem {...m} key={m.labelText} ref={ref} />
        ))}
      </>
    );
  }
);

const MainMenuItem = React.forwardRef((menu: IMenuComponent, ref) => {
  // NOTE carbon components don't support nesting more than one level out of the box
  // probably needs our own implementation if the need arises
  if (menu.components && menu.components.length > 0) {
    return (
      <HeaderMenu
        title={menu.labelText}
        menuLinkName={menu.labelText ?? ""}
        aria-label={menu.labelText || menu.usage}
        key={menu.labelText}
        ref={ref as (element: HTMLElement) => void}>
        {menu.components.filter(isMenu).map(m => (
          <MainMenuItem {...m} ref={ref} key={m.labelText} />
        ))}
      </HeaderMenu>
    );
  } else if (menu.href) {
    return (
      <Link href={menu.href} key={menu.href} passHref>
        <HeaderMenuItem
          href={menu.href}
          title={menu.labelText}
          key={menu.labelText}
          aria-label={menu.labelText || menu.usage}
          ref={ref}>
          {menu.labelText ?? ""}
        </HeaderMenuItem>
      </Link>
    );
  } else {
    return (
      <HeaderMenuItem
        title={menu.labelText}
        key={menu.labelText}
        ref={ref}
        aria-label={menu.labelText || menu.usage}>
        {menu.labelText ?? ""}
      </HeaderMenuItem>
    );
  }
});
