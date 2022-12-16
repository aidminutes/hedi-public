import Head from "next/head";
import { Column, Grid } from "carbon-components-react";
import { IMenuComponent } from "@/modules/components";
import {
  IUserSideNav,
  UserSideNavBar,
} from "@/modules/common/client/components/UserSideNavBar";
import { IUserInfo } from "@/modules/auth/types";
export default function SidenavPlayground() {
  const menu: IMenuComponent[] = [
    {
      labelText: "Anfragen",
      renderIcon: "Email16",
      kind: "Menu",
      href: "/anfragen",
    },
    {
      labelText: "Chat",
      renderIcon: "Forum16",
      kind: "Menu",
      href: "/chat",
    },
    {
      labelText: "Betreuungen",
      renderIcon: "WatsonHealthNominate16",
      kind: "Menu",
      href: "/playground/sidenav",
    },
    {
      labelText: "Profil",
      renderIcon: "User16",
      kind: "Menu",
      href: "/profil2",
      components: [
        {
          labelText: "Visitenkarte",
          renderIcon: "User24",
          kind: "Menu",
          href: "/playground/sidenav",
        } as IMenuComponent,
        {
          labelText: "Leistungen",
          renderIcon: "User24",
          kind: "Menu",
          href: "/profil",
        } as IMenuComponent,
        {
          labelText: "Kapazitäten",
          renderIcon: "User24",
          kind: "Menu",
          href: "/profil",
        } as IMenuComponent,
      ],
    },
  ];

  const user: IUserInfo = {
    name: "Ingrid Lohmann",
    email: "ilohmann@superhebamme.de",
  };

  const userSideNavMenu: IUserSideNav = {
    menuItems: [...menu],
    user,
    greetingText: "Moin",
  };

  return (
    <div>
      <Head>
        <title>SideNav</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Column>
            <UserSideNavBar {...userSideNavMenu} />
          </Column>
        </Grid>
      </main>
    </div>
  );
}
