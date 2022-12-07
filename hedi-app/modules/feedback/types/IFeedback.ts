import { IEntity } from "@/modules/model";

export interface IFeedback extends IEntity {
  label: string;
  body: string;
  metadata?: object;
  created?: Date;
}

export const implementsIUserFeedback = (obj: any) =>
  obj.body != null && obj.metadata != null;

export type FeedbackType = "ProfileTest" | "BrowserTest"; //TODO change for next feedbacks
