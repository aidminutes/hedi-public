import React, { useState, createContext, useEffect, useContext } from "react";
import { ILocaleInfo, ILocaleProviderConfig } from "./types";

const DefaultLocaleInfo: ILocaleInfo = {
  locale: "de",
  label: "Deutsch",
  isRTL: false,
};

const LocaleContext = createContext<{
  active: ILocaleInfo;
  enabled: ILocaleInfo[];
}>({ active: DefaultLocaleInfo, enabled: [DefaultLocaleInfo] });

export function useLocaleInfo() {
  return useContext(LocaleContext);
}

export const LocaleProvider: React.FC<Partial<ILocaleProviderConfig>> = ({
  lang,
  enabledLocaleInfos,
  children,
}) => {
  const [info, setInfo] = useState<ILocaleInfo>(
    getLocaleInfo(enabledLocaleInfos, lang)
  );
  useEffect(() => {
    if (info.locale !== lang) {
      setInfo(getLocaleInfo(enabledLocaleInfos, lang));
    }
  }, [lang, enabledLocaleInfos]);

  return (
    <LocaleContext.Provider
      value={{
        active: info,
        enabled: enabledLocaleInfos ?? [DefaultLocaleInfo],
      }}>
      {children}
    </LocaleContext.Provider>
  );
};

function getLocaleInfo(
  localeInfos?: ILocaleInfo[],
  locale: string = "de"
): ILocaleInfo {
  const match = localeInfos?.find(lang => lang.locale === locale);
  return match ?? DefaultLocaleInfo;
}
