import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type LabelKind = "Label";

export interface ILabelComponent extends IComponent {
  kind: LabelKind;
  labelKind: string;
  text?: HTML;
  anchor?: string;
  className?: string;
}

export const isLabel = (obj: IComponent): obj is ILabelComponent =>
  obj?.kind === "Label";

export const isLabelInstance = (
  obj: IComponent,
  id: string
): obj is ILabelComponent => isLabel(obj) && obj.id === id;

export const findLabelInstance = (array: IComponent[], id: string) =>
  findComponentInstance<ILabelComponent>("Label", array, id);

export const findHeadlineLabel = (array: IComponent[]) =>
  array
    .filter(isLabel)
    .find(item => item.labelKind === "h1" && item.id === "main");

export const getLabelInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ILabelComponent, "kind" | "id">
) => getComponentInstance("Label", array, id, fallback);
