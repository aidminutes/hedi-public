import { PartialBy } from "@/modules/common/utils";
import { ISvgComponent } from "../../../types";

export type ISvgProps = PartialBy<ISvgComponent, "kind" | "usage">;

export function transformSvg(props: ISvgProps) {
  const { route, labelText } = props;
  const src = process.env.NEXT_PUBLIC_ASSETS_URL + route;
  // TODO render real svg from source
  return { src, alt: labelText };
}
