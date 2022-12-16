import { ISegmentParam } from "@/modules/common/types";
import { getPageById } from "@/modules/common/server";
import { IPage } from "@/modules/common/types";
import { getShell, constructShellData } from "@/modules/shell/server";
import { IPageProps, IShellConfig } from "@/modules/shell/types";
import { GetStaticProps } from "next";
import { Shell } from "@/modules/shell/client/components";
import {
  findBodyInstance,
  getImageInstance,
  getLabelInstance,
  Label,
  Image,
} from "@/modules/components";
import { Body } from "@/modules/components";
import { Column, Grid, Row } from "carbon-components-react";
import { ShellProvider } from "@/modules/shell/client/contexts";

export const getStaticProps: GetStaticProps<
  IPageProps<IPage>,
  ISegmentParam
> = async ({ locale, locales }) => {
  const page = await getPageById(locale ?? "de", "404");
  const shellConfig: IShellConfig = {
    layout: {
      kind: "Blank",
      id: "404",
    },
  };

  const content = { ...page, ...shellConfig };
  const shellDefinition = await getShell(locale, locales);
  const shell = constructShellData(shellDefinition, content);
  return {
    props: { content, shell },
    revalidate: content.revalidate,
  };
};

export default function Custom404(props: IPageProps<IPage>) {
  const { content } = props;
  const text = findBodyInstance(content.components, "text");
  const headline = getLabelInstance(content.components, "mainHeadline", {
    labelKind: "h1",
  });
  const subheadline = getLabelInstance(content.components, "subHeadline", {
    labelKind: "h3",
  });
  const image = getImageInstance(content.components, "image", {
    label: "",
    route: "",
    width: 256,
    height: 256,
  });
  return (
    <ShellProvider>
      <Shell {...props}>
        <Grid>
          <Row>
            <Column lg={4} md={1} sm={0}></Column>
            <Column lg={8} md={6} sm={4}>
              <div className="hedi--404 hedi--centered">
                <Label {...headline} />
                <div className="hedi--404__image-container">
                  <Image {...image} />
                </div>
                <Label {...subheadline} />
                {text && (
                  <div className="hedi--404__body">
                    <Body {...text} />
                  </div>
                )}
              </div>
            </Column>
            <Column lg={4} md={1} sm={0}></Column>
          </Row>
        </Grid>
      </Shell>
    </ShellProvider>
  );
}
