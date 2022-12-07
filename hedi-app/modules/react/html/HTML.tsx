import { BasicHTML } from ".";
import { HTMLProps } from ".";
import { a } from "./a";
import { img } from "./img";

export const HTML = ({ data, callbacks }: HTMLProps) => (
  <BasicHTML data={data} callbacks={{ ...callbacks, a, img }} />
);
