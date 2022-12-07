import React from "react";
import { GetStaticProps } from "next";
import { IEntity } from "@/modules/model";
import { IPageProps } from "@/modules/shell/types";
import {
  getShell,
  constructShellData,
  getLayout,
} from "@/modules/shell/server";
import { Shell } from "@/modules/shell/client/components";
import { IPage } from "@/modules/common/types";
import { getPageById } from "@/modules/common/server";
import { getLandingPagePage } from "@/modules/generalPages/landingpage/server";
import {
  ILandingPageView,
  LandingPageView,
} from "@/modules/generalPages/landingpage/client/components";
import { ShellProvider } from "@/modules/shell/client/contexts";

export const getStaticProps: GetStaticProps<IPageProps<IEntity>> = async ({
  locale,
  locales,
}) => {
  const lang = locale ?? "de";

  const page = await getPageById(lang, "landingPage");

  const data = await getLandingPagePage(page as IPage);

  const layout = getLayout(data);
  const content = { ...data, ...layout };

  const shellDefinition = await getShell(locale, locales);
  const shell = constructShellData(shellDefinition, content);
  for (let langItem of shell.languageSwitch.options) {
    langItem.href = "/" + langItem.lang;
  }
  return {
    props: { content, shell },
    revalidate: content.revalidate,
  };
};

const Index: React.FC<IPageProps<IPage>> = props => {
  const { shell, content } = props;
  return (
    <ShellProvider>
      <Shell shell={shell}>
        <LandingPageView content={content as ILandingPageView} />
      </Shell>
    </ShellProvider>
  );
};

export default Index;
