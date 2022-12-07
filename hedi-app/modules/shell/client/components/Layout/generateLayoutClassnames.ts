import { ILayout } from "./types/ILayout";

export function generateLayoutClassnames(layout: Pick<ILayout, "id">) {
  const { id } = layout;

  const wrapperClass = `hedi--simple-page ${
    id !== undefined ? `hedi--${id}-page` : ""
  }`;

  const groupClass = `hedi--group hedi--group--${id}`;

  return {
    wrapperClass,
    groupClass,
  };
}
