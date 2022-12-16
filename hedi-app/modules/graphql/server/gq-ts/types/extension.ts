import { GQObject, GQType } from "./language";

export type FieldAlias<T, K extends keyof T> = {
  [P in keyof T as `@${string & K}Alias`]: string;
};

export type WithAlias<T, K extends keyof T> = T & FieldAlias<T, K> & GQObject;

export type FieldArgs<T, K extends keyof T> = {
  [P in keyof T as `@${string & K}Args`]: Record<string, any>;
};

export type WithArgs<T, K extends keyof T> = T & FieldArgs<T, K> & GQObject;

export type WithMultiform<T extends GQType> = { "@multiform": T[] };

export type InlineFragment = {
  "@inlineFragment": string;
};

export type WithInlineFragment<T> = T & InlineFragment & GQObject;
