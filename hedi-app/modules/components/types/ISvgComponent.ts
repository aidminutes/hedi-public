import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type SvgKind = "Svg";

export interface ISvgComponent extends IComponent {
  kind: SvgKind;
  route: string;
  labelText: HTML;
  usage?: string;
}

export const isSvg = (obj: IComponent): obj is ISvgComponent =>
  obj?.kind === "Svg";

export const isSvgInstance = (
  obj: IComponent,
  id: string
): obj is ISvgComponent => isSvg(obj) && obj.id === id;

export const findSvgInstance = (array: IComponent[], id: string) =>
  findComponentInstance<ISvgComponent>("Svg", array, id);

export const getSvgInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ISvgComponent, "kind" | "id">
) => getComponentInstance("Svg", array, id, fallback);
