import { IComponent, ILabelComponent } from "@/modules/components";
import React, { useState, createContext } from "react";

type CommonComponents = Record<string, IComponent> & {
  helloLabel?: ILabelComponent;
};
export interface IShellContext {
  isCommonComponentsSet: boolean;
  commonComponents: CommonComponents;
  setCommonComponents: (items: IComponent[]) => void;
}

export const ShellContext = createContext<IShellContext>({
  isCommonComponentsSet: false,
  commonComponents: {},
  setCommonComponents: () => {},
});

export const ShellProvider = ({ children }: { children: React.ReactChild }) => {
  const [isCommonComponentsSet, setIsCommonComponentsSet] = useState(false);
  const [commonComponents, commonComponentsSetter] = useState<CommonComponents>(
    {}
  );
  const setCommonComponents = (items: IComponent[]) => {
    setIsCommonComponentsSet(true);
    const componentsRecord: CommonComponents = {};
    if (items)
      items.forEach(componentItem => {
        componentsRecord[componentItem.id || "unknown"] = componentItem;
      });
    commonComponentsSetter(componentsRecord);
  };

  return (
    <ShellContext.Provider
      value={{
        isCommonComponentsSet,
        commonComponents,
        setCommonComponents,
      }}>
      {children}
    </ShellContext.Provider>
  );
};
