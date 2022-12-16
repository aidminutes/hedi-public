import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type DatePickerKind = "DatePicker";

export interface IDatePickerComponent extends IComponent {
  id: string;
  kind: DatePickerKind;
  datePickerType: "simple" | "single" | "range";
  dateFormat: string;
  labelText?: HTML;
  labelTextEnd?: HTML;
  isRequired?: boolean;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
}

export const isDatePicker = (obj: IComponent): obj is IDatePickerComponent =>
  obj?.kind === "DatePicker";

export const isDatePickerInstance = (
  obj: IComponent,
  id: string
): obj is IDatePickerComponent => isDatePicker(obj) && obj.id === id;

export const findDatePickerInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IDatePickerComponent>("DatePicker", array, id);

export const getDatePickerInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IDatePickerComponent, "kind" | "id">
) => getComponentInstance("DatePicker", array, id, fallback);
