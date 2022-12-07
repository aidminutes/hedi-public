import { IWizardData } from "@/modules/common/types";
import React, { useState, createContext, useEffect, useContext } from "react";
import { Layout } from "../../components";
import { ILayout } from "../../components/Layout/types/ILayout";
export interface ILayoutContext {
  layout: ILayout | undefined;
  setCurrentLayout: (layout: ILayout | undefined) => void;
}

export const LayoutContext = createContext<ILayoutContext>({
  layout: undefined,
  setCurrentLayout: (layout: ILayout | undefined) => {},
});

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export const LayoutProvider = ({
  children,
  layout,
}: {
  children: React.ReactChild;
  layout: ILayout | undefined;
}) => {
  const [currLayout, setCurrLayout] = useState<ILayout | undefined>(layout);

  const setActiveLayout = (layout: ILayout | undefined) => {
    setCurrLayout(layout);
  };

  useEffect(() => {
    if (layout != currLayout) {
      setActiveLayout(layout);
    }
  }, [layout]);

  return (
    <LayoutContext.Provider
      value={{
        layout: currLayout,
        setCurrentLayout: setActiveLayout,
      }}>
      {children}
    </LayoutContext.Provider>
  );
};
