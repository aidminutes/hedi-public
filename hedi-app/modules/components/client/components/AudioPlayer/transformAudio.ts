import { IAudioComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";

export function transformAudio(
  props: PartialBy<IAudioComponent, "kind" | "usage">
) {
  const { route, mimeType, labelText, visible } = props;

  return {
    src: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    mimeType,
    labelText: BasicHTML({ data: labelText }),
    isVisible: !!visible,
  };
}
