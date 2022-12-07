import Head from "next/head";
import { Grid, Row } from "carbon-components-react";
import { UserTile } from "@/modules/profile/client/components";
import { ILabelComponent } from "@/modules/components";

export default function ActionBarPlayground() {
  const emptyStateLabel: ILabelComponent = {
    kind: "Label",
    labelKind: "p",
    text: "Wie möchtest du HEDI nutzen? Wo möchtest du zu finden sein?",
  };
  return (
    <div>
      <Head>
        <title>Usertile</title>
      </Head>
      <main>
        <Grid>
          <Row>
            <h1>Usertile</h1>
          </Row>
          <Row>
            <UserTile
              isEmpty={true}
              emptyStateText={emptyStateLabel.text || ""}
              kind="Visibility"
              contentHeadline="Nutzung & Sichtbarkeit"
              onEditClick={() => console.log("CLick")}>
              <p>Hier ist das children</p>
            </UserTile>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
