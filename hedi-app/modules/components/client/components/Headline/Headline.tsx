import { createElement } from "react";
import { IHeadlineComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";

// TODO combine with Label maybe
export const Headline = (props: PartialBy<IHeadlineComponent, "kind">) => {
  const { id, text, headline, anchor, className } = props;
  const element = headline === "h1" ? "h2" : headline;

  if (!text) return null;

  return createElement(
    element,
    { id: anchor ?? id, className: className },
    BasicHTML({ data: text })
  );
};
