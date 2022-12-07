import { IPage, IWizardData, Wizards } from "@/modules/common/types";
import { IPageConfig } from "@/modules/shell/types";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState, createContext, useEffect, useContext } from "react";
import { ILayout } from "../../components/Layout/types/ILayout";
export interface ISystemContextData {
  wizardId?: Wizards;
  wizardState?: string;
  wizardData?: IWizardData<any>[];
  pageData?: (IPage & IPageConfig) | undefined;
  redirectMode?: boolean;
  redirectQuery?: ParsedUrlQuery;
}

export interface ISystemContext {
  sysData?: ISystemContextData;
  setSysData: (data: ISystemContextData) => void;
}

export const SystemContext = createContext<ISystemContext>({
  sysData: {},
  setSysData: (data: ISystemContextData) => {},
});

export function useSystemContext() {
  return useContext(SystemContext);
}

export const SystemProvider = ({
  children,
  systemData,
}: {
  children: React.ReactChild;
  systemData?: ISystemContextData;
}) => {
  const [data, setData] = useState<ISystemContextData | undefined>(systemData);
  const setSystemData = (data: ISystemContextData) => {
    setData(data);
  };

  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>(router.locale ?? "de");

  const keepCurrentLang = () => {
    setCurrentLang(router.locale ?? "de");
  };

  useEffect(() => {
    router.events.on("routeChangeStart", keepCurrentLang);
    return () => router.events.off("routeChangeStart", keepCurrentLang);
  }, [router]);

  useEffect(() => {
    const locale = router.locale ?? "de";
    if (locale == currentLang) {
      if (!data?.redirectMode) {
        setSystemData({});
      } else {
        setSystemData({ ...data, redirectMode: false });
      }
    }
  }, [router.asPath]);

  return (
    <SystemContext.Provider
      value={{
        sysData: data,
        setSysData: setSystemData,
      }}>
      {children}
    </SystemContext.Provider>
  );
};
