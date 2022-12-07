import {
  Column,
  FormGroup,
  FormGroupProps,
  Row,
} from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import { useInteractiveList } from "@/modules/react/hooks";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import {
  AddressInputDefault,
  IAddressInput,
  IPersonalProfileDistinguisher,
} from "../../../types";
import { AddressInput, IAddressInputDefinition } from "./AddressInput";

export type IAddressesInputProps = {
  value?: IAddressInput[];
} & IAddressesInputDefinition &
  IAddressesInputConfig &
  Partial<Omit<FormGroupProps, "onChange">> &
  IPersonalProfileDistinguisher;

export interface IAddressesInputDefinition {
  addressInputDefinition: IAddressInputDefinition;
  addressesLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IAddressesInputConfig {
  defaultItem?: IAddressInput;
  maxCount?: number;
  onChange?: (addresses: IAddressInput[]) => void;
}

export const AddressesInput = (props: IAddressesInputProps) => {
  const {
    value,
    addressInputDefinition,
    addressesLabel,
    addButton,
    removeButton,
    defaultItem,
    maxCount,
    onChange,
    personalContext,
    ...formGroupProps
  } = props;

  const {
    list: addressInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(defaultItem ?? AddressInputDefault, value, onChange);
  const { labelText, ...restRemoveButton } = removeButton;
  return (
    <Row>
      <Column {...{ sm: 4, md: 8, lg: 4 }} className="hedi--account__headline">
        <Label {...addressesLabel} />
      </Column>
      <Column {...{ sm: 4, md: 8, lg: 12 }}>
        {addressInputs.map((value, i) => (
          <AddressInput
            personalContext={personalContext}
            value={value}
            {...addressInputDefinition}
            onChange={item => handleItemChange(item, i)}>
            <div className="hedi--row-icon__wrap">
              <Button
                {...restRemoveButton}
                iconDescription={labelText}
                hasIconOnly
                renderIcon={TrashCan32}
                onClick={_ => handleRemoveClick(i)}
              />
            </div>
          </AddressInput>
        ))}
        {(!maxCount || addressInputs.length < maxCount) && (
          <Button {...addButton} renderIcon={Add32} onClick={handleAddClick} />
        )}
      </Column>
    </Row>
  );
};
