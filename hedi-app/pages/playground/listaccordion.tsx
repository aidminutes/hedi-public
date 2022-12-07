import Head from "next/head";
import { Column, Grid, Row } from "carbon-components-react";
import { ListAccordion } from "@/modules/common/client/components";

const title = "Betreuung und Behandlung Schwangerer und Mütter";
const elements = [
  "Delfi-Kurs",
  "Eltern-Kind-Gruppe",
  "Elterngruppe",
  "Emotionale Erste Hilfe",
];

const emptyElements: string[] = [];

const emptyStateText =
  "Du hast keine Leistungen in dieser Kategorie ausgewählt.";
export default function ServiceListAccordionPlayground() {
  return (
    <div>
      <Head>
        <title>ListAccordion</title>
      </Head>
      <main style={{ padding: "50px", background: "lightgrey" }}>
        <Grid>
          <Row>
            <h1>ListAccordion</h1>
          </Row>
          <Row>
            <Column>
              <ListAccordion
                title={title}
                elements={elements}
                emptyStateText={emptyStateText}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <ListAccordion
                title={title}
                elements={emptyElements}
                emptyStateText={emptyStateText}
              />
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
