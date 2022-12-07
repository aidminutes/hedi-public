import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type NumberInputKind = "NumberInput";

export interface INumberInputComponent extends IComponent {
  id: string;
  kind: NumberInputKind;
  label?: HTML;
  isRequired?: boolean;
  helperText?: HTML;
  value?: number;
  min?: number;
  max?: number;
  ariaLabel?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export const isNumberInput = (obj: IComponent): obj is INumberInputComponent =>
  obj?.kind === "NumberInput";

export const isNumberInputInstance = (
  obj: IComponent,
  id: string
): obj is INumberInputComponent => isNumberInput(obj) && obj.id === id;

export const findNumberInputInstance = (array: IComponent[], id: string) =>
  findComponentInstance<INumberInputComponent>("NumberInput", array, id);

export const getNumberInputInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<INumberInputComponent, "kind" | "id">
) => getComponentInstance("NumberInput", array, id, fallback);
