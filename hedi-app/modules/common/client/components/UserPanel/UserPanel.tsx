import { useCurrentUser } from "@/modules/auth/client/hooks/useCurrentUser";
import { findMenuHeaderInstance, findParentMenu } from "@/modules/components";
import { ShellContext, useLocaleInfo } from "@/modules/shell/client/contexts";
import { Column, Grid, Loading, Row } from "carbon-components-react";
import { ReactNode, useContext } from "react";
import { MenuHeader } from "../MenuHeader/MenuHeader";
import { MenuTab } from "../MenuTab";
import { UserSideNavBar } from "../UserSideNavBar";
import { transformMenu } from "./transformMenu";
import { useUserPanel } from "./useUserPanel";

interface IUserPanelProps {
  children?: ReactNode;
}

export const UserPanel = (props: IUserPanelProps) => {
  const { user, userMenuItems, activeMenu, menuTabItems } = useUserPanel();

  const [currentUser] = useCurrentUser();

  let menuHeader = activeMenu?.components
    ? findMenuHeaderInstance(activeMenu?.components)
    : null;
  if (menuHeader == null) {
    const { activeMenuHierarchy } = transformMenu(userMenuItems);
    const foundElement = activeMenu
      ? findParentMenu(activeMenuHierarchy, activeMenu)
      : null;
    menuHeader = foundElement?.components
      ? foundElement
        ? findMenuHeaderInstance(foundElement?.components)
        : null
      : null;
  }
  const greetingText = useContext(ShellContext).commonComponents.helloLabel
    ?.text;
  return (
    <>
      {currentUser && userMenuItems && (
        <UserSideNavBar
          greetingText={greetingText}
          user={currentUser}
          menuItems={userMenuItems}
        />
      )}
      <div className="hedi--userpanel-layout">
        {menuHeader && (
          <MenuHeader header={menuHeader}>
            {menuTabItems && (
              <MenuTab items={menuTabItems} activeRoute={activeMenu?.href} />
            )}
          </MenuHeader>
        )}
        <Grid>{props.children}</Grid>
      </div>
      {!user || !userMenuItems ? <Loading /> : null}
    </>
  );
};
