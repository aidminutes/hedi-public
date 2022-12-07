import Head from "next/head";
import { Column, Grid, Row } from "carbon-components-react";

export default function FontSizePlayground() {
  return (
    <div>
      <Head>
        <title>Font Size</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Font Size</h1>
          </Row>
          <Row>
            <Column>
              <h1>Dies ist eine h1 Überschrift</h1>
            </Column>
          </Row>
          <Row>
            <Column>
              <h2>Dies ist eine h2 Überschrift</h2>
            </Column>
          </Row>
          <Row>
            <Column>
              <h3>Dies ist eine h3 Überschrift</h3>
            </Column>
          </Row>
          <Row>
            <Column>
              <h4>Dies ist eine h4 Überschrift</h4>
            </Column>
          </Row>
          <Row>
            <Column>
              <h5>Dies ist eine h5 Überschrift</h5>
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
