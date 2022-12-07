import { createElement } from "react";
import { ILabelComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";

// TODO labelKind vielleicht nur valid html Elemente
export const Label = (
  props: PartialBy<ILabelComponent, "kind" | "id"> & { useAnchor?: boolean }
) => {
  const { text, labelKind, anchor, className, useAnchor } = props;
  if (!text) return null;

  let id = undefined;
  if (!!anchor && !!useAnchor) id = anchor;

  return createElement(labelKind, { id, className }, BasicHTML({ data: text }));
};
