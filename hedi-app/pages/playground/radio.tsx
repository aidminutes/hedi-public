import Head from "next/head";
import { Column, Grid, RadioButtonGroup, Row } from "carbon-components-react";

import { IRadioButtonGroupComponent } from "@/modules/components/types/IRadioButtonGroupComponent";
import { RadioButton } from "@/modules/components";

const radio: IRadioButtonGroupComponent = {
  id: "radio",
  kind: "RadioButtonGroup",
  name: "RadioButtons",
  items: [
    { kind: "RadioButton", id: "1", value: "1", labelText: "Option 1" },
    { kind: "RadioButton", id: "2", value: "2", labelText: "Option 2" },
    { kind: "RadioButton", id: "3", value: "3", labelText: "Option 3" },
    { kind: "RadioButton", id: "4", value: "4", labelText: "Option 4" },
  ],
};
export default function RadioPlayground() {
  return (
    <div>
      <Head>
        <title>RadioButton</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>RadioButton</h1>
          </Row>
          <Row>
            <Column>
              <RadioButton {...radio} />
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
