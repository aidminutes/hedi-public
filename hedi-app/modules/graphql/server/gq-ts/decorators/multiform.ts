import { gql } from "..";
import { GQType, WithMultiform } from "../types";

/**
 * Decorates an object property to be resolved multiple forms & values in a graphql query
 * @param forms the possible forms & values
 * @returns a new object that represents the multiform
 */
export function withMultiform<T extends GQType>(
  ...forms: T[]
): WithMultiform<T> {
  return {
    "@multiform": forms,
  };
}

export function generateMultiform(args: GQType[]): string {
  return args
    .map(v => {
      return gql`
        ${v}
      `;
    })
    .join(" ");
}

export function isMultiformKey(key: string) {
  return key === "@multiform";
}
