import { IEntityTranslated } from "@/modules/model";
import {
  IPageConfig,
  IShellDefinition,
  IShellDefinitionConfig,
  IShell,
} from "../types";
import { StylesCache } from "@/modules/media/server/cache";
import { omitUndefined } from "@/modules/common/utils";
import { isIPage } from "@/modules/common/types";
import { configureShellDefinition } from "../client/components/Shell/configureShellDefinition";
import { isGridColumnLayout } from "../client/components/Layout/types/IGridColumnLayout";
import { isFullWidthLayout } from "../client/components/Layout/types/IFullWidthLayout";
import { isTitleOutsideLayout } from "../client/components/Layout/types/ITitleOutsideLayout";

export function constructShellData(
  shellDefinition: IShellDefinition,
  content: IEntityTranslated & IPageConfig
): IShell {
  const {
    label,
    lang,
    translations,
    appStyle,
    revalidate,
    redirectUnAuthorized,
    layout,
    hideScrollToTop,
    hideHeader,
    meta,
    hideFooter,
  } = content;

  if (layout) {
    // TODO extract, type strictly & ILayout as discriminated union
    layout.label = label;
    if (isIPage(content)) layout.id = content.id;
  }

  let pageConfig: IPageConfig = {
    appStyle,
    redirectUnAuthorized,
    revalidate,
    layout,
  };

  if (hideHeader) pageConfig.hideHeader = hideHeader;
  if (hideFooter) pageConfig.hideFooter = hideFooter;
  if (meta) pageConfig.meta = meta;

  const shellDefConfig: IShellDefinitionConfig = {
    hideAccountMenu: !!process.env.FEATURE_hideAccountMenu,
    hideScrollToTop,
  };

  const shell = configureShellDefinition(shellDefinition, shellDefConfig, {
    lang,
    translations,
  });

  const result = {
    label,
    ...pageConfig,
    ...shell,
  };

  return omitUndefined(result);
}
