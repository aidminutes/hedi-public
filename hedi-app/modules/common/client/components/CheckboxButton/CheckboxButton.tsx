import React from "react";
import { Body, Button } from "@/modules/components";
import { useCheckboxButton } from "./useCheckboxButton";
import { ICheckboxButtonProps } from "./types";

export const CheckboxButton = (props: ICheckboxButtonProps) => {
  const { buttonState, handleChange, isChecked } = useCheckboxButton(props);

  return (
    <div className="hedi--checkbox-button__container">
      <Button
        className="hedi--checkbox-button"
        kind="Button"
        size="sm"
        onClick={() => handleChange()}
        {...buttonState}
      />
      {props.showTooltip && props.tooltipText && isChecked && (
        <div className="hedi--checkbox-button__tooltip">
          <Body {...props.tooltipText} />
        </div>
      )}
    </div>
  );
};
