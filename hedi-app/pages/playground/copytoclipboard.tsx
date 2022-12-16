import Head from "next/head";
import { Column, Grid, Row, CopyButton } from "carbon-components-react";
import { CopyLinkToClipboard } from "@/modules/common/client/components";
import { ICopyLinkToClipboard } from "@/modules/common/client/components/CopyLinkToClipboard/types";
import { IComponent, IInlineNotificationComponent } from "@/modules/components";
import { getCopyLinkToClipboardDefinition } from "@/modules/common/client/components/CopyLinkToClipboard/getCopyLinkToClipboardDefinition";

const components: IComponent[] = [
  {
    kind: "InlineNotification",
    title: "Bla",
    id: "copyLinkNotificationText",
  } as IInlineNotificationComponent,
];
const { notificationText } = getCopyLinkToClipboardDefinition(components);

const link: ICopyLinkToClipboard = {
  route: "www.aidminutes.com",
  size: "lg",
  notificationText,
};

export default function CopyToClipboardPlayground() {
  return (
    <div>
      <Head>
        <title>Copy To Clipboard</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Copy To Clipboard</h1>
            <CopyLinkToClipboard {...link} />
          </Row>
          <Row>
            <Column></Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
