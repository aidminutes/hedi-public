import {
  IBodyComponent,
  IButtonComponent,
  ICheckboxProps,
} from "@/modules/components";

export type ICheckboxButtonProps = {} & ICheckboxButtonDefinition &
  ICheckboxButtonConfig;

export interface ICheckboxButtonDefinition {
  selectButton: IButtonComponent;
  selectedButton: IButtonComponent;
  requestSentButton: IButtonComponent;
  tooltipText?: IBodyComponent;
}

interface ICheckboxButtonConfig extends Pick<ICheckboxProps, "checked"> {
  isDisabled?: boolean;
  disabledText?: string;
  onChange?: (checked: boolean) => void;
  showTooltip?: boolean;
}
