import {
  Column,
  FormGroup,
  FormGroupProps,
  Row,
} from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";
import {
  IPersonalProfileDistinguisher,
  IPhoneInput,
  PhoneInputDefault,
} from "../../../types";
import { PhoneInput, IPhoneInputDefinition } from "./PhoneInput";
import { Seperator } from "@/modules/common/client/components";

export type IPhonesInputProps = {
  value?: IPhoneInput[];
} & IPhonesInputDefinition &
  IPhonesInputConfig &
  Partial<Omit<FormGroupProps, "onChange">> &
  IPersonalProfileDistinguisher;

export interface IPhonesInputDefinition {
  phoneInputDefinition: IPhoneInputDefinition;
  phonesLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IPhonesInputConfig {
  defaultItem?: IPhoneInput;
  maxCount?: number;
  onChange?: (phones: IPhoneInput[]) => void;
}

export const PhonesInput = (props: IPhonesInputProps) => {
  const {
    value,
    phoneInputDefinition,
    phonesLabel,
    addButton,
    removeButton,
    defaultItem,
    maxCount,
    onChange,
    personalContext,
    ...formGroupProps
  } = props;

  const {
    list: phoneInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(defaultItem ?? PhoneInputDefault, value, onChange);

  const { labelText, ...restRemoveButton } = removeButton;
  return (
    <Row>
      <Column {...{ sm: 4, md: 8, lg: 4 }} className="hedi--account__headline">
        <Label {...phonesLabel} />
      </Column>
      <Column {...{ sm: 4, md: 8, lg: 12 }}>
        {phoneInputs.map((value, i) => (
          <PhoneInput
            personalContext={personalContext}
            value={value}
            {...phoneInputDefinition}
            onChange={item => handleItemChange(item, i)}>
            <div className="hedi--flex-end">
              <Button
                {...restRemoveButton}
                iconDescription={labelText}
                hasIconOnly
                renderIcon={TrashCan32}
                onClick={_ => handleRemoveClick(i)}
              />
            </div>
          </PhoneInput>
        ))}
        {(!maxCount || phoneInputs.length < maxCount) && (
          <>
            <Button
              {...addButton}
              renderIcon={Add32}
              onClick={handleAddClick}
            />
            <Seperator color="gray" type="m" />
          </>
        )}
      </Column>
    </Row>
  );
};
