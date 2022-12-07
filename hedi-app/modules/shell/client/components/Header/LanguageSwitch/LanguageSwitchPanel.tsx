// Types
import Link from "next/link";
import { HeaderPanel, Switcher, SwitcherItem } from "carbon-components-react";
import { useRouter } from "next/router";
import { segmentsQueryToSearchParams } from "@/modules/common/utils";
import { ILanguageSwitchPanel } from "./types";
import { useEffect } from "react";

export const LanguageSwitchPanel = (props: ILanguageSwitchPanel) => {
  const router = useRouter();
  const searchParams = segmentsQueryToSearchParams(router.query);
  const { options, lang, closeLanguageSwitch, ...rest } = props;

  useEffect(() => {
    router.events.on("routeChangeComplete", closeLanguageSwitch);
    return () => router.events.off("routeChangeComplete", closeLanguageSwitch);
  });

  if (options.length > 0) {
    return (
      <HeaderPanel {...rest}>
        <Switcher aria-label={props["aria-label"]}>
          {options.map(opt => {
            const href = opt.href ? opt.href + searchParams : "#";
            return (
              <Link href={href} locale={opt.lang} passHref key={opt.labelText}>
                <SwitcherItem hrefLang={opt.lang} aria-label={opt.labelText}>
                  {opt.labelText ?? ""}
                </SwitcherItem>
              </Link>
            );
          })}
        </Switcher>
      </HeaderPanel>
    );
  } else return null;
};
