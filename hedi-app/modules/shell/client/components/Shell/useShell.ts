import { AssertClientSide } from "@/modules/common/utils";
import { IShell } from "@/modules/shell/types";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { isGridColumnLayout } from "../Layout/types/IGridColumnLayout";
import { ILayout } from "../Layout/types/ILayout";
import { isTitleOutsideLayout } from "../Layout/types/ITitleOutsideLayout";
import { usePageAccess } from "./usePageAccess";

export interface IUseShell {
  hasPageAccess: boolean;
  hediStyle: string;
  currentLayout: ILayout | undefined;
  layoutHeadline: string | null;
}

export function useShell<IUseShell>(shell: IShell) {
  const { appStyle, redirectUnAuthorized } = shell;

  //Read the layout from the context and not from the shell.
  const layoutContext = useLayoutContext();

  const [currentLayout, setCurrentLayout] = useState<ILayout | undefined>(
    layoutContext.layout
  );
  const [layoutHeadline, setLayoutHeadline] = useState<string | null>(null);
  useEffect(() => {
    setCurrentLayout(layoutContext.layout);
  }, [layoutContext.layout]);

  const [hediStyle, setHediStyle] = useState("");

  // TODO find better way
  useEffect(() => {
    const layoutHeadlineStr =
      currentLayout &&
      (isTitleOutsideLayout(currentLayout) || isGridColumnLayout(currentLayout))
        ? currentLayout.headline
        : null;
    setLayoutHeadline(layoutHeadlineStr);
  }, [currentLayout]);

  useEffect(() => {
    // HACK use later on
    setHediStyle(appStyle ?? "hedi-category-color--default");
  }, [appStyle]);

  let urlHash: string | undefined = undefined;
  if (AssertClientSide()) {
    const hashText = window.location.hash.substring(1);
    const isHashTextEncoded = decodeURIComponent(hashText) != hashText;
    urlHash = isHashTextEncoded ? decodeURIComponent(hashText) : hashText;
  }
  // NOTE: to solve scrolling on hedi-internal links
  useEffect(() => {
    if (urlHash && AssertClientSide()) {
      const element = document.querySelector(`[id="${urlHash}"]`);
      if (element) {
        // Smooth scroll to that element
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  }, [urlHash]);

  const { hasPageAccess } = usePageAccess(redirectUnAuthorized);

  return {
    hasPageAccess,
    hediStyle,
    currentLayout,

    layoutHeadline,
  };
}
