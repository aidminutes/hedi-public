import { Link16, Link24, Link32 } from "@carbon/icons-react";
import { CopyToClipboardIconSize } from "./types";

export function getRenderIcon(size?: CopyToClipboardIconSize) {
  switch (size) {
    case "sm":
      return Link16;
    case "md":
      return Link24;
    default:
      return Link32;
  }
}
