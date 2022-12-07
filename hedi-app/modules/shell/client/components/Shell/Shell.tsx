import Head from "next/head";
import { ShellContext } from "../../contexts";
import { Content, Loading } from "carbon-components-react";
import { IUseShell, useShell } from "./useShell";
import { ScrollToTop } from "../ScrollToTop";
import { Layout } from "../Layout";
import { Header, Footer } from "..";
import { IShell } from "../../../types";
import { PrintLogo } from "../PrintLogo";
import { useSysMessageNotifier } from "@/modules/sysmessage/client/hooks/useSysMessageNotifier";
import { useRouter } from "next/router";
import { useContext } from "react";

export const Shell: React.FC<{
  shell: IShell;
  isVisible?: boolean;
}> = props => {
  const { shell, isVisible = true, children } = props;
  const {
    label,
    localeProvider,
    hideHeader,
    hideFooter,
    scrollToTop,
    footer,
    meta,
    commonComponents,
  } = shell;

  const { hasPageAccess, hediStyle, currentLayout, layoutHeadline } = useShell(
    shell
  );

  const router = useRouter();
  useSysMessageNotifier(router.locale);

  const shellContext = useContext(ShellContext);
  if (!shellContext.isCommonComponentsSet)
    shellContext.setCommonComponents(commonComponents);

  if (!isVisible) {
    return <>{children}</>;
  }

  return (
    <div className={hediStyle}>
      <Head>
        {!!!meta?.indexing && (
          <>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
          </>
        )}
        <title>
          HEDI
          {layoutHeadline
            ? ` - ${layoutHeadline}`
            : label
            ? ` - ${label}`
            : null}
        </title>
        {meta?.description && (
          <meta name="description" content={meta.description} />
        )}
      </Head>
      {hasPageAccess ? (
        <>
          {!hideHeader ? (
            <Header lang={localeProvider?.lang} {...shell} />
          ) : null}
          <PrintLogo />
          <Content>
            {currentLayout ? (
              <Layout layout={currentLayout}>{children}</Layout>
            ) : (
              <>{children}</>
            )}
          </Content>
          {!hideFooter && !!footer && <Footer {...footer} />}
          {scrollToTop && <ScrollToTop {...scrollToTop} appStyle={hediStyle} />}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
