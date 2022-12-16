import {
  IBodyComponent,
  IButtonComponent,
  IImageComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  ILinkComponent,
} from "@/modules/components/types";
import { IPage } from "@/modules/common/types";

export interface IBrowserTestView extends IPage {}

export interface IBrowserTestViewDefinition {
  headline: ILabelComponent;
  sendButton: IButtonComponent;
  body: IBodyComponent;
  failureInlineNotification: IInlineNotificationComponent;
  successImage: IImageComponent;
  successText: ILabelComponent;
  backToHomeLink: ILinkComponent;
}
