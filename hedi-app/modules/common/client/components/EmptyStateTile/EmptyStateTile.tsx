import {
  Body,
  IBodyComponent,
  IImageComponent,
  Image,
} from "@/modules/components";
import { Column, Row } from "carbon-components-react";
import React, { ReactNode } from "react";

export interface IEmptyStateTileProps {
  img: IImageComponent;
  text: IBodyComponent;
  renderInteractionArea?: () => ReactNode;
}

export const EmptyStateTile = (props: IEmptyStateTileProps) => {
  const { img, text, renderInteractionArea } = props;
  return (
    <Row>
      <Column lg={6} md={4} sm={4}>
        <div className="hedi--empty-state-tile">
          <div className="hedi--empty-state-tile__image-container">
            <Image {...img} />
          </div>
          <div className="hedi--empty-state-tile__text-container">
            <Body {...text} />
          </div>
          {renderInteractionArea && (
            <div className="hedi--empty-state-tile__interaction-area">
              {renderInteractionArea()}
            </div>
          )}
        </div>
      </Column>
    </Row>
  );
};
