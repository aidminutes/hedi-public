import Link from "next/link";
import { HeaderPanel, Switcher, SwitcherItem } from "carbon-components-react";
import { IAccountMenuPanel } from "./types";
import { Body, IMenuComponent, isBody, isMenu } from "@/modules/components";
import { Seperator } from "@/modules/common/client/components";
import { useUser } from "@/modules/auth/client/hooks/useUser";

export const AccountMenuPanel = (props: IAccountMenuPanel) => {
  const {
    iconDescription,
    labelText,
    components,
    expanded,
    onMouseLeave,
  } = props;
  const label = iconDescription || labelText;

  return (
    <HeaderPanel
      aria-label={label}
      expanded={expanded}
      onMouseLeave={onMouseLeave}
      className="user-menu">
      <SwitcherMenu components={components} labelText={label} isRoot={true} />
    </HeaderPanel>
  );
};

function SwitcherMenu({
  components,
  labelText,
  isRoot = false,
}: Pick<IMenuComponent, "components" | "labelText"> & { isRoot?: boolean }) {
  const [user] = useUser();
  if (!components) return null;
  return (
    <Switcher aria-label={labelText} key={labelText}>
      {!isRoot && <SwitcherMenuItem kind="Menu" labelText={labelText} />}
      {components.map(component =>
        isMenu(component) ? (
          <SwitcherMenuItem {...component} key={component.labelText} />
        ) : !user && isBody(component) && component.id === "accountMenuBody" ? (
          <div className="hedi--header-panel__text-container">
            <Seperator />
            <Body {...component} />
          </div>
        ) : null
      )}
    </Switcher>
  );
}

const emptyFn = () => {};

function SwitcherMenuItem(menu: IMenuComponent) {
  if (menu.components && menu.components.length > 0) {
    return (
      <SwitcherMenu
        components={menu.components}
        labelText={menu.labelText}
        key={menu.labelText}
      />
    );
  } else if (menu.onClick || !menu.href) {
    return (
      <SwitcherItem
        onClick={menu.onClick || emptyFn}
        aria-label={menu.labelText}
        key={menu.labelText}>
        {menu.labelText ?? ""}
      </SwitcherItem>
    );
  } else {
    return (
      <Link href={menu.href ?? "#"} passHref>
        <SwitcherItem aria-label={menu.labelText} key={menu.labelText}>
          {menu.labelText ?? ""}
        </SwitcherItem>
      </Link>
    );
  }
}
