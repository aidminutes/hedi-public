import { useEffect, useState } from "react";
import useSWR from "swr";
import { getArticleContent } from "../../request/getArticleContent";
import { IArticleContent } from "../../../types/IArticleContent";
import { useLocaleInfo } from "@/modules/shell/client/contexts";
import { ActionBarType, IActionBarAction, IArticle } from "../../../types";
import { ILocaleInfo } from "@/modules/shell/client/contexts/LocaleContext/types";
import { MenuKind } from "@/modules/components";

export function useArticleContent(
  initial: IArticleContent & Pick<IArticle, "route" | "translations">
) {
  const { active, enabled: localeInfos } = useLocaleInfo();

  const [contentRoute, setContentRoute] = useState<string | undefined>(
    undefined
  );
  const [langSwitchActions, setLangSwitchActions] = useState<
    IActionBarAction[]
  >([]);

  useEffect(() => {
    setContentRoute(undefined);
    const actions = constructActions(
      initial.translations,
      initial.lang,
      localeInfos,
      setContentRoute
    );
    setLangSwitchActions(actions);
  }, [initial.route]);

  const { data } = useSWR(
    contentRoute ? [contentRoute, initial.lang] : null,
    (route, hrefLang) =>
      getArticleContent(route, hrefLang).then(resp => {
        const content = resp.data ?? initial;
        const localeInfo =
          localeInfos.find(l => l.locale === resp.data?.lang) ?? active;
        return { content, localeInfo };
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    content: data?.content ?? (initial as IArticleContent),
    localeInfo: data?.localeInfo ?? active,
    languageSwitchActions: langSwitchActions,
  };
}

function constructActions(
  translations: IArticle["translations"],
  locale: IArticle["lang"],
  localeInfos: ILocaleInfo[],
  setContentRoute: (contentRoute: string | undefined) => void
) {
  return translations
    .map(({ route, lang }) => ({
      kind: "Menu" as MenuKind,
      type: "language" as ActionBarType,
      active: false,
      iconDescription: localeInfos.find(l => l.locale === lang)?.label ?? lang,
      onClick: () => setContentRoute(lang !== locale ? route : undefined),
    }))
    .sort((a, b) => a.iconDescription.localeCompare(b.iconDescription));
}
