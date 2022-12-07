import { GetStaticPaths, GetStaticProps } from "next/types";

import { IEntityTranslated } from "@/modules/model";

import { getRevalidateValueByType } from "@/modules/common/revalidate";

// common
import { ISegmentParam } from "@/modules/common/types";
import { normalizeSegments } from "@/modules/common/routing/normalize";
import {
  getIEntitiesTranslated,
  getSegmentsPaths,
} from "@/modules/common/server";

import { gql } from "@/modules/graphql/server/gq-ts";

// Shell
import { getShell, constructShellData } from "@/modules/shell/server";
import { hasShell, Shell } from "@/modules/shell/client/components";
import { IPageConfig, IPageProps } from "@/modules/shell/types";

import { StylesCache } from "@/modules/media/server/cache";

// Page
import { getPageType } from "@/modules/common/server/page";
import { TryPage } from "@/modules/common/client/components";
import { isIPage, IPage } from "@/modules/common/types";
import { GQPage } from "@/modules/common/server/gqTypes/GQIPage";
import { GQPagePaths } from "@/modules/common/server/gqTypes/GQPagePath";

// Editorial Pages
import { TryGeneralPages } from "@/modules/generalPages/client/components/TryGeneralPages";

// Editorial
import { isIArticle } from "@/modules/editorial/article/types";
import { GQArticle } from "@/modules/editorial/article/server/gqTypes/GQIArticle";
import { GQArticlePaths } from "@/modules/editorial/article/server/gqTypes/GQArticlePath";
import { getArticlePage } from "@/modules/editorial/article/server/page/getArticlePage";
import { isICategory } from "@/modules/editorial/category/types";
import { GQCategory } from "@/modules/editorial/category/server/gqTypes/GQICategory";
import { GQCategoryPaths } from "@/modules/editorial/category/server/gqTypes/GQCategoryPath";
import { getCategoryPage } from "@/modules/editorial/category/server/page/getCategoryPage";
import { TryEditorial } from "@/modules/editorial/client/components/TryEditorial";

// Search
import { TrySearch } from "@/modules/search/client/components";
import { SearchRoutesCache } from "@/modules/search/server/cache/SearchRoutesCache";

// Auth
import {
  TryLogin,
  TryRegistration,
  TryActivation,
  TryResetPassword,
} from "@/modules/auth/client";

// Profile
import { isIProfile } from "@/modules/profile/types";
import { GQOrganisation } from "@/modules/profile/server/gqTypes/GQOrganisation";
import { GQOrganisationPaths } from "@/modules/profile/server/gqTypes/GQOrganisationPaths";
import { getProfilePage } from "@/modules/profile/server/pages/getProfilePage";
import { ProfileRoutesCache } from "@/modules/profile/server/cache/ProfileRoutesCache";
import { TryProfile } from "@/modules/profile/client/components/TryProfile";
import { GQProfessional } from "@/modules/profile/server/gqTypes/GQProfessional";
import { GQProfessionalPaths } from "@/modules/profile/server/gqTypes/GPProfessionalPaths";
import { GQMidwife } from "@/modules/profile/server/gqTypes/GQMidwife";
import { GQMidwifePaths } from "@/modules/profile/server/gqTypes/GQMidwifePaths";

// Networking
import { NetworkingRoutesCache } from "@/modules/networking/server/cache/NetworkingRoutesCache";
import { TryNetworking } from "@/modules/networking/client/components/TryNetworking";

// SysMessage
import { SysMessageRoutesCache } from "@/modules/sysmessage/server/cache/SysMessageRoutesCache";
import { TrySysMessage } from "@/modules/sysmessage/client/components/TrySysMessage";

// Messaging
import { MessagingRoutesCache } from "@/modules/messaging/server/cache/MessagingRoutesCache";
import { TryMessaging } from "@/modules/messaging/client/components/TryMessaging";

import { TryBrowserTest } from "@/modules/feedback/client/components";

import { TryPagesReport } from "@/modules/pagesReport/client/components";
import { ShellProvider } from "@/modules/shell/client/contexts/ShellContext/ShellContext";
import { LayoutProvider } from "@/modules/shell/client/contexts/LayoutContext";
import { SystemProvider } from "@/modules/shell/client/contexts/SystemContext/SystemContext";
import { LocaleProvider } from "@/modules/shell/client/contexts";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const pathQueries = [
    GQArticlePaths,
    GQCategoryPaths,
    GQOrganisationPaths,
    // comment out professional profiles for release (April) after cards have been checked with midwife type
    GQProfessionalPaths,
    GQMidwifePaths,
    GQPagePaths,
  ];

  const locales = context?.locales ?? [];
  const paths = [];
  for (const lang of locales) {
    paths.push(...(await getSegmentsPaths(pathQueries, lang)));
  }
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  IPageProps<IEntityTranslated>,
  ISegmentParam
> = async ({ params, locale, locales }) => {
  const lang = locale ?? "de";

  await Promise.all([
    SearchRoutesCache.initialize(locales ?? [lang]),
    ProfileRoutesCache.initialize(locales ?? [lang]),
    NetworkingRoutesCache.initialize(locales ?? [lang]),
    SysMessageRoutesCache.initialize(locales ?? [lang]),
    MessagingRoutesCache.initialize(locales ?? [lang]),
  ]);

  const route = normalizeSegments(params?.segments, lang, [
    ...SearchRoutesCache.getRouteTransformFunctions(),
    ...ProfileRoutesCache.getRouteTransformFunctions(),
    ...NetworkingRoutesCache.getRouteTransformFunctions(),
    ...SysMessageRoutesCache.getRouteTransformFunctions(),
    ...MessagingRoutesCache.getRouteTransformFunctions(),
  ]);

  let content: (IEntityTranslated & IPageConfig) | null = null;

  const gqTypes = [
    GQArticle,
    GQCategory,
    GQOrganisation,
    GQProfessional,
    GQMidwife,
    GQPage,
  ];

  let counter = 0;
  let entities;
  do {
    entities = await getIEntitiesTranslated<IEntityTranslated>(
      gqTypes,
      [route],
      lang
    );
    counter++;
  } while (!entities?.[0] && counter < 5);

  if (entities?.[0]) {
    let generic = entities[0];
    await StylesCache.assertValid();
    if (isIPage(generic)) generic = await getPageType(generic);
    if (isIArticle(generic)) generic = await getArticlePage(generic);
    if (isICategory(generic)) generic = await getCategoryPage(generic);
    if (isIProfile(generic)) generic = await getProfilePage(generic);
    content = generic;
  }

  // this is the only one which doesn't rely on the generic content query because our cms currently cannot resolve this path
  // if we don't find a way to include it in the generic query we should probably cache the possible routes on getPath and match the string
  // if (!content) content = await getGlossaryPage(route);
  // }
  if (!content) {
    if (route !== `/${locale}/404`) {
      // redirect to 404 to avoid caching
      return {
        redirect: {
          destination: `/${locale}/404`,
          permanent: false,
        },
        revalidate: true,
      };
    } else {
      return { notFound: true };
    }
  }

  const shellDefinition = await getShell(locale, locales);
  const shell = constructShellData(shellDefinition, content);

  return {
    props: { content, shell },
    revalidate: getRevalidateValueByType(content.type),
  };
};

export default function segments(props: IPageProps<IPage>) {
  const { content, shell } = props;
  const isShellVisible = hasShell(content.id)
  return (
    <ShellProvider>
      <SystemProvider>
        <LocaleProvider {...shell.localeProvider}>
          <LayoutProvider layout={shell.layout}>
            <Shell shell={shell} isVisible={isShellVisible}>
              <>
                <TryGeneralPages content={content} key="generalPages" />

                <TryEditorial content={content} key="editorial" />

                <TrySearch content={content} key="search" />

                <TryLogin content={content} key="login" />
                <TryRegistration content={content} key="registration" />

                <TryActivation content={content} key="activation" />
                <TryResetPassword content={content} key="resetPassword" />

                <TryProfile content={content} key="profile" />

                <TryNetworking content={content} key="networking" />

                <TrySysMessage content={content} key="sysmessage" />

                <TryMessaging content={content} key={"messaging"} />

                <TryPagesReport content={content} key={content.type} />

                {/* <TryFeedback content={content} key="feedback" /> */}
                {/* <TryFeedbackThanks content={content} key="feedbackThanks" /> */}
                <TryBrowserTest content={content} key="browserTest" />

                <TryPage content={content} key="page" />
              </>
            </Shell>
          </LayoutProvider>
        </LocaleProvider>
      </SystemProvider>
    </ShellProvider>
  );
}
