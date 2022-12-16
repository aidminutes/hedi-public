import { Label } from "@/modules/components";
import React, { ChangeEvent } from "react";

export interface IToggleRadio {
  label: string;
  name: string;
  onChangeFunction: (e: any) => void;
  toggleValue: boolean | undefined;
  positiveOption?: string;
  negativeOption?: string;
  disabled?: boolean;
}

export const ToggleRadio = (props: IToggleRadio) => {
  const {
    label,
    name,
    toggleValue,
    onChangeFunction,
    positiveOption,
    negativeOption,
    disabled,
  } = props;
  return (
    <>
      <Label labelKind="label" className="bx--label" text={label} />
      <div className="hedi--radio-group">
        <div>
          <input
            disabled={disabled}
            type="radio"
            id={`${name}-1`}
            name={name}
            checked={toggleValue === true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChangeFunction(e.target.checked)
            }
          />
          <label htmlFor={`${name}-1`}>{positiveOption}</label>
        </div>
        <div>
          <input
            disabled={disabled}
            type="radio"
            id={`${name}-2`}
            name={name}
            checked={toggleValue === false}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChangeFunction(!e.target.checked)
            }
          />
          <label htmlFor={`${name}-2`}>{negativeOption}</label>
        </div>
      </div>
    </>
  );
};
