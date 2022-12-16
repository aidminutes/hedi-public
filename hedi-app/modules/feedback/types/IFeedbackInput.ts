import { FeedbackType } from ".";

export interface IFeedbackInput {
  type: FeedbackType;
  texts: string[];
}
