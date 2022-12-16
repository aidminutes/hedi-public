import { IDatePickerComponent } from "../../../types";
import { BasicHTML } from "@/modules/react/html";
import { DatePickerProps, DatePickerInputProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type IDatePickerProps = PartialBy<IDatePickerComponent, "kind"> &
  Omit<
    DatePickerProps,
    "id" | "dateFormat" | "minDate" | "maxDate" | "datePickerType"
  >;

interface IDatePickerAndInputProps extends DatePickerProps {
  datePickerInput: DatePickerInputProps[];
}

export function transformDatePicker(
  props: IDatePickerProps
): IDatePickerAndInputProps {
  const {
    id,
    kind,
    labelText,
    labelTextEnd,
    placeholder,
    isRequired,
    ...rest
  } = props;
  let { className } = rest;
  if (isRequired) className = `${className} required-input`.trim();
  const idFirstElement = rest.datePickerType === "range" ? id + "_start" : id;

  // const pattern = '\\.+?'; //HACK disabling input syntax validation, has to be aligned with dateFormat pattern
  const pattern = "\\d{4}\\-\\d{1,2}\\-\\d{2}";
  const datePickerInput: DatePickerInputProps[] = [
    {
      labelText: BasicHTML({ data: labelText }) || "",
      id: idFirstElement,
      placeholder,
      pattern,
      required: isRequired,
    },
  ];

  if (rest.datePickerType === "range")
    datePickerInput.push({
      labelText:
        BasicHTML({ data: labelTextEnd }) ||
        BasicHTML({ data: labelText }) ||
        "",
      id: id + "_end",
      placeholder,
      pattern,
      required: isRequired,
    });

  return {
    id,
    datePickerInput,
    ...rest,
    className,
  };
}
