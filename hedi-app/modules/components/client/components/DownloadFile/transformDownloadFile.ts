import { IFileComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";

export type IDownloadFileProps = PartialBy<IFileComponent, "kind" | "usage">;

export function transformDownloadFile(props: IDownloadFileProps) {
  const { labelText, mimeType, route } = props;

  return {
    href: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    text: BasicHTML({ data: labelText }),
    mimeType,
  };
}
