import { IWithType } from "@/modules/model";
import { IPage } from "@/modules/common/types";
import { FeedbackThanksView } from "./FeedbackThanksView";

export const TryFeedbackThanks = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null =>
  content.type === "FeedbackThanks" ? (
    <FeedbackThanksView content={content as IPage} />
  ) : null;
