import { IWithType } from "@/modules/model";
import { IPage } from "@/modules/common/types";
import { Page } from "./Page";

export const TryPage = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null =>
  content.type === "Page" ? <Page content={content as IPage} /> : null;
