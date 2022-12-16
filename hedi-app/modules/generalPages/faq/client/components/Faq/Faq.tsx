import React from "react";
import { getFaqDefinition } from "./getFaqDefinitions";
import { Column, Grid, Row } from "carbon-components-react";
import { Body, Label, Image } from "@/modules/components";
import { Accordion } from "@/modules/common/client/components";
import { IPage } from "@/modules/common/types";
import { transformFaqPage } from "./transformFaqPage";
export const Faq = ({ content }: { content: IPage }) => {
  const { mainHeadline, text } = getFaqDefinition(content.components);
  const { questions } = transformFaqPage(content.components);
  return (
    <div className="hedi--faq__wrap">
      <Grid>
        <Row>
          <Column lg={4} md={1} sm={0} />
          <Column className="hedi--faq__headline">
            <Label {...mainHeadline} />
          </Column>
          <Column lg={4} md={1} sm={0} />
        </Row>
        <Row condensed>
          <Column lg={4} md={1} sm={0} />
          <Column>
            <Accordion data={questions} />
          </Column>
          <Column lg={4} md={1} sm={0} />
        </Row>
        <Row>
          <Column lg={4} md={1} sm={0} />
          <Column>
            <Body {...text} />
          </Column>
          <Column lg={4} md={1} sm={0} />
        </Row>
      </Grid>
    </div>
  );
};
