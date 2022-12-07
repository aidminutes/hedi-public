import { IWithType } from "@/modules/model";
import { IPage } from "@/modules/common/types";
import { PagesReportView } from "./PagesReportView";

export const TryPagesReport = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null =>
  content.type === "PagesReport" ? (
    <PagesReportView content={content as IPage} />
  ) : null;
