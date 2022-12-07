import {
  Header as CarbonHeader,
  HeaderGlobalBar,
  HeaderNavigation,
} from "carbon-components-react";

import { IHeader } from "./types";
import { useBackToHome, BackToHome } from "./BackToHome";
import { MainMenu } from "./MainMenu";
// import { GlobalSearchMenu } from "../GlobalSearchMenu";
import {
  useAccountMenu,
  AccountMenuAction,
  AccountMenuPanel,
} from "./AccountMenu";
import {
  useLanguageSwitch,
  LanguageSwitchAction,
  LanguageSwitchPanel,
} from "./LanguageSwitch";
import { useSideMenu, SideMenuButton, SideMenuPanel } from "./SideMenu";

export const Header = (props: IHeader) => {
  const {
    lang,
    appStyle,
    backToHome: backToHomeDefinition,
    mainMenu,
    accountMenu: initialAccountMenu,
    languageSwitch,
    footer,
  } = props;

  const backToHome = useBackToHome(backToHomeDefinition);

  const { sideMenuButton, sideMenuPanel, closeSideMenu } = useSideMenu({
    backToHome,
    mainMenu,
    footer,
  });

  const { languageSwitchAction, languageSwitchPanel } = useLanguageSwitch(
    languageSwitch,
    closeSideMenu
  );
  
  const { accountMenu, accountMenuAction, accountMenuPanel } = useAccountMenu(
    initialAccountMenu,
    lang,
    closeSideMenu
  );
  sideMenuPanel.accountMenu = accountMenu;

  return (
    <CarbonHeader
      className={`hedi--header ${appStyle ?? "hedi-category-color--default"}`}
      aria-label="header">
      <BackToHome {...backToHome} />
      <HeaderNavigation aria-label="Navigation" style={{ display: "block" }}>
        <SideMenuButton {...sideMenuButton} />
        {!!mainMenu && <MainMenu {...mainMenu} />}
      </HeaderNavigation>
      <HeaderGlobalBar>
        {/* <GlobalSearchMenu /> */}
        {!!accountMenuAction && <AccountMenuAction {...accountMenuAction} />}
        {!!languageSwitchAction && (
          <LanguageSwitchAction {...languageSwitchAction} />
        )}
      </HeaderGlobalBar>
      {!!accountMenuPanel && <AccountMenuPanel {...accountMenuPanel} />}
      {!!languageSwitchPanel && (
        <LanguageSwitchPanel {...languageSwitchPanel} />
      )}
      <SideMenuPanel {...sideMenuPanel} />
    </CarbonHeader>
  );
};
