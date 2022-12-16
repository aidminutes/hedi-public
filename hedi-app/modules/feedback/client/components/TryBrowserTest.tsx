import { IWithType } from "@/modules/model";
import { IBrowserTestView } from "../../types/IBrowserTestView";
import { BrowserTestView } from "./BrowserTestView";

export const TryBrowserTest = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null =>
  content.type === "BrowserTest" ? (
    <BrowserTestView content={content as IBrowserTestView} />
  ) : null;
