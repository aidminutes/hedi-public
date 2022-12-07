import { Body, IComponent, Image, Label } from "@/modules/components";
import { Column, Row } from "carbon-components-react";
import React from "react";
import { getNetworkRequestTeaserDefinition } from "./getNetworkRequestTeaserDefinition";

export const NetworkRequestTeaser = ({
  components,
}: {
  components: IComponent[];
}) => {
  const {
    teaserBody,
    teaserHeadlineLabel,
    teaserImage,
    teaserSubheadlineLabel,
  } = getNetworkRequestTeaserDefinition(components);
  return (
    <Row>
      <Column lg={10} md={6}>
        <div className="hedi--midwife-network-request__teaser">
          <Label
            {...teaserSubheadlineLabel}
            className="hedi--midwife-network-request__teaser-subheadline"
          />
          <Label
            {...teaserHeadlineLabel}
            className="hedi--midwife-network-request__teaser-headline"
          />
          <div className="hedi--midwife-network-request__teaser-body">
            <Body {...teaserBody} />
          </div>
          <div className="hedi--midwife-network-request__teaser-image">
            <Image {...teaserImage} />
          </div>
        </div>
      </Column>
    </Row>
  );
};
