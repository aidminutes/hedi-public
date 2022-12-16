import { IWithType } from "@/modules/model";
import { IPage } from "@/modules/common/types";

export const TryFeedback = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null =>
  content.type === "Feedback" ? (
    <>{/* feedback view module element goes here */}</>
  ) : null;
