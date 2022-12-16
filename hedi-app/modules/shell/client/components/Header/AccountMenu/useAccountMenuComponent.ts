import { useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "@/modules/auth/client/hooks/useUser";
import { getMyAccountMenu } from "../../../request";
import { IAccountMenu } from "./types";
import { useLogout } from "../../../hooks/useLogout";
import { getRedirectParam } from "@/modules/common/utils";
import { isMenu } from "@/modules/components";

export function useAccountMenuComponent(menu?: IAccountMenu, lang = "de") {
  const [publicMenu, setPublicMenu] = useState<IAccountMenu | undefined>(
    undefined
  );

  const { redirectParamString } = getRedirectParam();
  useEffect(() => {
    if (menu) {
      menu.components = menu.components.map(item => {
        if (isMenu(item) && item.href && item.usage === "useRedirect") {
          item.href += "?" + redirectParamString;
        }
        return item;
      });
    }
    setPublicMenu(menu);
  }, [menu, redirectParamString]);

  const [user, loading] = useUser();
  const userName = loading ? null : user?.name ?? null;
  const { logout } = useLogout();
  const { data } = useSWR(userName ? [lang, userName] : null, async lang => {
    const response = await getMyAccountMenu(lang);

    if (response.success && response.data) {
      const menuComponent = response.data;
      menuComponent.components = menuComponent.components.map(item => {
        if (isMenu(item) && item.usage === "logout") {
          item.onClick = logout;
        }
        return item;
      });
      return menuComponent;
    } else {
      return undefined;
    }
  });
  return { accountMenu: data ?? publicMenu };
}
