import { PartialBy } from "@/modules/common/utils";
import { IBodyComponent } from "../../../types";

export type IBodyProps = PartialBy<IBodyComponent, "kind" | "id">;

export function transformBody(props: IBodyProps) {
  const { kind, body, ...rest } = props;

  return { body, rest };
}
