import { GetStaticProps } from "next";
import Head from "next/head";
import { Column, Grid, Row, CodeSnippet } from "carbon-components-react";

import {
  GQNumber,
  GQString,
  withAlias,
  withInlineFragment,
  gqOmit,
  gqPick,
  withArgs,
  gql,
} from "@/modules/graphql/server/gq-ts";
import { GQIPageEntry } from "@/modules/common/server/gqTypes/GQIPageEntry";
import { GQPage } from "@/modules/common/server/gqTypes/GQIPage";

const prettySpan = ([start, end]: [start: bigint, end: bigint]) =>
  (Number(end - start) / 1000).toFixed(4) + " μs";

export const getStaticProps: GetStaticProps<{ data: any }> = async () => {
  const span: [bigint, bigint] = [BigInt(0), BigInt(0)];
  const arr = Array(1024);

  span[0] = process.hrtime.bigint();
  for (const _ of arr) {
    //
  }
  span[1] = process.hrtime.bigint();
  const oldTime = prettySpan(span);

  span[0] = process.hrtime.bigint();
  for (const _ of arr) {
    //
  }
  span[1] = process.hrtime.bigint();
  const newTime = prettySpan(span);

  return {
    props: {
      data: {
        oldTime,
        newTime,
      },
    },
  };
};

export default function GQTSPlayground({ data }: { data: any }) {
  const picked = gqPick(GQIPageEntry, ["label", "type"]);

  const q = withArgs(
    withAlias(
      {
        myPages: GQPage,
      },
      "myPages",
      "pages"
    ),
    "myPages",
    { routes: ["/de/anmelden", "/de/404"], lang: "$lang" }
  );

  const toString = gql`query MyQuery { ${q} }`;

  return (
    <div>
      <Head>
        <title>Debug</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <Column>
              <CodeSnippet type="multi">
                {JSON.stringify(data, null, 1)}
              </CodeSnippet>
            </Column>
            <Column>
              <CodeSnippet type="multi">{gql`
                ${GQIPageEntry}
              `}</CodeSnippet>
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
