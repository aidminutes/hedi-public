import Head from "next/head";
import { useState } from "react";
import { FuzzyFilterDropdown } from "@/modules/common/client/components";
import { Column, Grid, Row } from "carbon-components-react";

const items = [
  {
    route: "Kinderarzt",
    label: "Kinderarzt",
  },
  {
    route: "Kinderärztin",
    label: "Kinderärztin",
  },
  {
    route: "Pediatrist",
    label: "Pediatrist",
  },
  {
    route: "Pediatristin",
    label: "Pediatristin",
  },
  {
    route: "",
    label: "Tier Ärztinh",
  },
];

const ffdata = {
  placeholder: "Placeholder Text",
  titleText: "Title Text",
  helperText: "Helper Text",
  id: "Fuzzy",
};

const fuzzInit = { label: "Wähle was aus", route: "" };

export default function FuzzyFilterPlayground() {
  const [fuzz, setFuzz] = useState({
    route: "Nico",
    label: "Nico",
  });

  const handleChange = (value: any) => {
    if (value) setFuzz(value);
  };

  return (
    <div>
      <Head>
        <title>Fuzzy Filter</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Fuzzy Filter</h1>
          </Row>
          <Row>
            <Column>
              <FuzzyFilterDropdown
                onChange={handleChange}
                value={fuzz}
                items={items}
                {...ffdata}
              />
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
