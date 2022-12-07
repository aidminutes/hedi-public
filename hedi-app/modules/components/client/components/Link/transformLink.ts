import { ILinkComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { LinkProps } from "carbon-components-react/lib/components/Link/Link";
import { PartialBy } from "@/modules/common/utils";

export type ILinkProps = PartialBy<ILinkComponent, "kind"> &
  Omit<LinkProps, "id">;

export function transformLink(props: ILinkProps) {
  const { kind, labelText, ariaLabel, ...rest } = props;
  return {
    labelText: BasicHTML({ data: labelText }),
    "aria-label": ariaLabel,
    ...rest,
  };
}
