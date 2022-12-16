import { HTML, IComponent, Component } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type ColumnKind = "Column";

export interface IColumnComponent extends IComponent {
  kind: ColumnKind;
  usage: string;
  components: Component[];
  labelText?: HTML;
}

export const isColumn = (obj: IComponent): obj is IColumnComponent =>
  obj?.kind === "Column";

export const isColumnInstance = (
  obj: IComponent,
  id: string
): obj is IColumnComponent => isColumn(obj) && obj.id === id;

export const findColumnInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IColumnComponent>("Column", array, id);

export const getColumnInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IColumnComponent, "kind" | "id">
) => getComponentInstance("Column", array, id, fallback);
