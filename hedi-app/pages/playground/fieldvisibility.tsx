import { Column, Grid, Row } from "carbon-components-react";
import { SelectFieldVisibility } from "@/modules/common/client/components";
import Head from "next/head";
import { ISelectItem } from "@/modules/components";
import { ISelectFieldVisibilty } from "@/modules/common/client/components/SelectFieldVisibility/transformSelectFieldVisibility";
import { useState } from "react";
const items: ISelectItem[] = [
  { label: "Öffentlich", index: 0, route: "" },
  {
    label: "Registrierte Benutzer*innen",
    index: 1,
    route: "",
  },
  { label: "Verbundene Benutzer*innen", index: 2, route: "" },
];

export default function FieldPlayground() {
  const [number, setNumber] = useState<number>(1);

  const handleChange = (v: number) => {
    setNumber(v);
  };

  const data: ISelectFieldVisibilty = {
    items,
    value: 0,
    kind: "Select",
    id: "test",
    onChange: handleChange,
  };

  return (
    <div>
      <Head>
        <title>Field Access</title>
      </Head>
      <Grid>
        <Row>
          <h1>FieldAccess</h1>
        </Row>
        <Row>
          <Column>
            <SelectFieldVisibility {...data} />
          </Column>
        </Row>
      </Grid>
    </div>
  );
}
