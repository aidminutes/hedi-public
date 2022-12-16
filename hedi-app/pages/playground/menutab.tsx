import { MenuTab } from "@/modules/common/client/components/MenuTab";
import { IMenuComponent } from "@/modules/components";
import { useAccountMenu } from "@/modules/shell/client/components/Header/AccountMenu";
import { Column, Row } from "carbon-components-react";
import { useEffect, useState } from "react";

export default function MenuTabPlayground() {
  const { accountMenu } = useAccountMenu();
  const [testMenu, setTestMenu] = useState<IMenuComponent[]>([]);
  useEffect(() => {
    if (!accountMenu) return;
    const subMenu = (accountMenu?.components?.[0] as IMenuComponent)
      .components as IMenuComponent[];
    if (subMenu) setTestMenu(subMenu);
  }, [accountMenu]);

  return (
    <div>
      <Row>
        <Column>login to see user menu here</Column>
      </Row>
      <Row>
        <Column>
          <MenuTab items={testMenu} activeRoute="/" />
        </Column>
      </Row>
    </div>
  );
}
