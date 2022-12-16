import Head from "next/head";
import { Column, Grid, Row } from "carbon-components-react";

import { FeatureFlag, FeatureFlags } from "@/modules/common/client/components";

export default function FeatureFlagsPlayground() {
  return (
    <div>
      <Head>
        <title>Feature Flags</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Feature Flags</h1>
          </Row>
          <Row>
            <Column>
              <p>Feature flag "testActive" sollte rendern:</p>
              <FeatureFlag name={FeatureFlags.testActive}>☑️</FeatureFlag>
            </Column>
            <Column>
              <p>
                Feature flag "testInactive" sollte <strong>nicht</strong>{" "}
                rendern:
              </p>
              <FeatureFlag name={FeatureFlags.testInactive}>☑️</FeatureFlag>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>Feature flag "testActive" mit fallback content:</p>
              <FeatureFlag
                name={FeatureFlags.testActive}
                fallbackContent={<span>❌</span>}>
                ☑️
              </FeatureFlag>
            </Column>
            <Column>
              <p>Feature flag "testInactive" mit fallback content:</p>
              <FeatureFlag
                name={FeatureFlags.testInactive}
                fallbackContent={<span>❌</span>}>
                ☑️
              </FeatureFlag>
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
