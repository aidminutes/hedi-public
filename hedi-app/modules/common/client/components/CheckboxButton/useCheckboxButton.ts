import { IButtonProps } from "@/modules/components";
import { useState, useEffect } from "react";
import {
  Checkbox24,
  CheckboxCheckedFilled24,
  Checkmark24,
} from "@carbon/icons-react";
import { ICheckboxButtonProps } from "./types";

export function useCheckboxButton(props: ICheckboxButtonProps) {
  const {
    selectButton,
    selectedButton,
    requestSentButton,
    isDisabled = false,
    disabledText,
    onChange,
    checked,
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(!!checked);

  const selectState: IButtonProps = {
    renderIcon: Checkbox24,
    ...selectButton,
  };
  const selectedState: IButtonProps = {
    renderIcon: CheckboxCheckedFilled24,
    ...selectedButton,
  };
  const requestSentState: IButtonProps = {
    renderIcon: Checkmark24,
    disabled: true,
    ...requestSentButton,
    text: disabledText || requestSentButton.text,
  };

  const handleChange = () => {
    const newState = !isChecked;

    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  const [buttonState, setButtonState] = useState<IButtonProps>(
    isDisabled ? requestSentState : selectState
  );

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  useEffect(() => {
    if (isDisabled) {
      setButtonState(requestSentState);
      return;
    }
    if (isChecked) {
      setButtonState(selectedState);
      return;
    }
    setButtonState(selectState);
  }, [isChecked]);

  return { buttonState, handleChange, isChecked };
}
