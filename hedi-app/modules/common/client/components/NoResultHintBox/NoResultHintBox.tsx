import {
  IBodyComponent,
  IImageComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { Body, Image } from "@/modules/components";
import React from "react";

export interface INoResultHintBox {
  notification: IInlineNotificationComponent;
  hint: IBodyComponent;
  icon: IImageComponent;
  headline?: ILabelComponent;
  additionalHint?: IBodyComponent;
}

export const NoResultHintBox = (props: INoResultHintBox) => {
  const { hint, icon, headline, notification, additionalHint } = props;
  return (
    <div className="hedi--no-results-hint-box__container">
      <div className="hedi--no-results-hint-box">
        <Image className="hedi--no-results-hint-box__icon" {...icon} />
        <div className="hedi--no-results-hint-box__text">
          {headline && (
            <strong>
              <Label labelKind="h4" text={notification.title} />
            </strong>
          )}
          <Body {...hint} />
        </div>
      </div>
      <div className="hedi--no-results-hint-box__addtional-hint">
        <Body {...additionalHint} />
      </div>
    </div>
  );
};
