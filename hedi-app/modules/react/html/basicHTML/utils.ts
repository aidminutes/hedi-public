import { CSSProperties, HTMLAttributes } from "react";
import { IParserAttributeInfo } from "./types";

const camelCase = (value: string): string => {
  return value.replace(/[-_\s.]+(.)?/g, (_match, chr) =>
    chr ? chr.toUpperCase() : ""
  );
};

export const attributesToProps = (attributes?: IParserAttributeInfo) => {
  if (!attributes) return attributes;
  const { class: className, style, ...rest } = attributes;
  let result: HTMLAttributes<any> = rest;
  if (className) result.className = className;
  if (style) result.style = parseCSSProperties(style);
  return result;
};

export const parseCSSProperties = (text: string): CSSProperties | undefined => {
  if (!text || text === "") return undefined;

  let result: { [k: string]: string } = {};
  for (const rule of text.split(";")) {
    if (rule) {
      const [k, v] = rule.split(":");
      const key = camelCase(k.trim());
      result[key] = v.trim();
    }
  }
  return result;
};
