import { createElement, HTMLAttributes } from "react";
import { IParserElementInfo } from "./types";
import { attributesToProps } from "./utils";

export const defaultTransform = (
  htmlString: string,
  parseInfo: IParserElementInfo,
  props?: HTMLAttributes<any>
) => {
  if (
    parseInfo.needsTransform ||
    parseInfo.name === "br" ||
    parseInfo.name === "innerText"
  ) {
    const children =
      parseInfo.children.length === 0
        ? undefined
        : parseInfo.children.map(info =>
            info.transform(htmlString, info, attributesToProps(info.attributes))
          );
    return createElement(
      parseInfo.name,
      { key: parseInfo.name + parseInfo.start, ...props },
      children
    );
  } else {
    if (props && parseInfo.children.length > 0) {
      const start = parseInfo.children[0].start;
      const end = parseInfo.children[parseInfo.children.length - 1].end;
      props.dangerouslySetInnerHTML = {
        __html: htmlString.substring(start, end),
      };
    }

    return createElement(parseInfo.name, {
      key: parseInfo.name + parseInfo.start,
      ...props,
    });
  }
};
