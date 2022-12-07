import { generateLayoutClassnames } from "./generateLayoutClassnames";
import {
  FullWidth,
  TitleOutside,
  GridColumn,
  Blank,
  Account,
} from "./templates";
import { ILayout } from "./types/ILayout";
import { isFullWidthLayout } from "./types/IFullWidthLayout";
import { isTitleOutsideLayout } from "./types/ITitleOutsideLayout";
import { isGridColumnLayout } from "./types/IGridColumnLayout";
import { isBlankLayout } from "./types/IBlankLayout";
import { isAccountLayout } from "./types/IAccountLayout";
import React from "react";
import { isUserPanelLayout } from "./types/IUserPanelLayout";
import { UserPanel } from "@/modules/common/client/components/UserPanel";
import { isWideGridLayout } from "./types/IWideGridLayout";
import { WideGridLayout } from "./templates/WideGridLayout";

export const Layout: React.FC<{ layout: ILayout }> = ({ layout, children }) => {
  const { wrapperClass, groupClass } = generateLayoutClassnames(layout);

  if (isFullWidthLayout(layout)) {
    return (
      <div className={wrapperClass}>
        <FullWidth {...layout} groupClass={groupClass}>
          {children}
        </FullWidth>
      </div>
    );
  }
  if (isTitleOutsideLayout(layout)) {
    return (
      <div className={wrapperClass}>
        <TitleOutside {...layout} groupClass={groupClass}>
          {children}
        </TitleOutside>
      </div>
    );
  }
  if (isBlankLayout(layout)) {
    return (
      <div className={wrapperClass}>
        <Blank {...layout} groupClass={groupClass}>
          {children}
        </Blank>
      </div>
    );
  }
  if (isGridColumnLayout(layout)) {
    return (
      <div className={wrapperClass}>
        <GridColumn {...layout} groupClass={groupClass}>
          {children}
        </GridColumn>
      </div>
    );
  }
  if (isAccountLayout(layout)) {
    return (
      <div className={wrapperClass}>
        <Account {...layout} groupClass={groupClass}>
          {children}
        </Account>
      </div>
    );
  }
  if (isWideGridLayout(layout)) {
    return (
      <div className={wrapperClass}>
        <WideGridLayout {...layout} groupClass={groupClass}>
          {children}
        </WideGridLayout>
      </div>
    );
  }
  if (isUserPanelLayout(layout)) {
    return (
      <div className={wrapperClass}>
        <UserPanel>{children}</UserPanel>
      </div>
    );
  } else {
    return <div className={wrapperClass}>{children}</div>;
  }
};
