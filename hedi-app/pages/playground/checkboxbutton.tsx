import Head from "next/head";
import { Column, Grid, Row } from "carbon-components-react";
import { CheckboxButton } from "@/modules/common/client/components";
import { getCheckboxButtonDefinition } from "@/modules/common/client/components/CheckboxButton/getCheckboxButtonDefinition";
import { IComponent } from "@/modules/components";
import { useState } from "react";

export default function CheckboxbuttonPlayground() {
  const components: IComponent[] = [];
  const data = getCheckboxButtonDefinition(components);

  const [state, setState] = useState(false);

  return (
    <div>
      <Head>
        <title>Checkboxbutton</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Checkboxbutton</h1>
          </Row>
          <Row>
            <Column>
              <CheckboxButton {...data} onChange={setState} />
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
