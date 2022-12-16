import Head from "next/head";
import { Grid, Row } from "carbon-components-react";
import { Button, IBodyComponent, IImageComponent } from "@/modules/components";
import { EmptyStateTile } from "@/modules/common/client/components";

export default function EmptyStateTilePlayground() {
  const text: IBodyComponent = {
    kind: "Body",
    body: "<p>Zurzeit hast du keine Betreuungen oder neuen Anfragen</p>",
  };
  const image: IImageComponent = {
    width: 160,
    height: 120,
    kind: "Image",
    route: "",
    label: "",
  };
  return (
    <div>
      <Head>
        <title>EmptyStateTile</title>
      </Head>
      <main>
        <Grid>
          <Row>
            <h1>EmptyStateTile</h1>
          </Row>
          <Row>
            <EmptyStateTile
              text={text}
              img={image}
              renderInteractionArea={() => (
                <Button buttonKind="primary" labelText="Hier gehts weiter" />
              )}
            />
          </Row>
        </Grid>
      </main>
    </div>
  );
}
