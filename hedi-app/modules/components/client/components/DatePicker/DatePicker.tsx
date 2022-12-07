import React from "react";
import { IDatePickerProps, transformDatePicker } from "./transformDatePicker";
import {
  DatePicker as CarbonDatePicker,
  DatePickerInput,
} from "carbon-components-react";
export const DatePicker = (props: IDatePickerProps) => {
  const { datePickerInput, ...rest } = transformDatePicker(props);

  return (
    <CarbonDatePicker {...rest}>
      {datePickerInput.map((dpinput, index) => (
        <DatePickerInput key={index} {...dpinput} />
      ))}
    </CarbonDatePicker>
  );
};
