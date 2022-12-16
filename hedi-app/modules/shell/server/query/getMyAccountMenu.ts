import { logAndNull } from "@/modules/common/error";
import { IPage } from "@/modules/common/types";
import { IAuthHeader } from "@/modules/auth/types";
import { findMenuInstance, isMenu } from "@/modules/components";
import { userGQuery } from "@/modules/graphql";
import { gql, gqPick, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIPage } from "@/modules/common/server/gqTypes/GQIPage";
import { IAccountMenu } from "../../client/components/Header/AccountMenu/types";

type MyAccountMenuResponse = Pick<IPage, "components">;

const gqMyAccountMenu: { pagesById: MyAccountMenuResponse[] } = {
  pagesById: [gqPick(GQIPage, ["components"])],
};

const getMyAccountMenuQuery = gql`
    query getMyAccountMenu($lang: String!) {
      ${withArgs(gqMyAccountMenu, "pagesById", {
        ids: ["menu.account"],
        lang: "$lang",
      })}
    }
  `;

export async function getMyAccountMenu(
  lang: string = "de",
  authHeader: IAuthHeader
): Promise<IAccountMenu | null> {
  const { components: pageComponents } = await userGQuery<{
    pagesById: IPage[];
  }>(authHeader, getMyAccountMenuQuery, { lang }).then(data => {
    const response = logAndNull(data);
    return response?.pagesById && response.pagesById.length > 0
      ? response?.pagesById[0]
      : ({ components: [] } as MyAccountMenuResponse);
  });
  const menu = findMenuInstance(pageComponents, "account");
  if (menu) {
    const { id, components, ...rest } = menu;
    const accountMenu = {
      ...rest,
      id: "account",
      components: components?.filter(isMenu) ?? [],
    };

    return accountMenu as IAccountMenu;
  }
  return null;
}
