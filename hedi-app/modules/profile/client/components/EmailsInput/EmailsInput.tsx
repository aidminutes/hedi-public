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
import {
  EmailInputDefault,
  IEmailInput,
  IPersonalProfileDistinguisher,
} from "../../../types";
import { EmailInput, IEmailInputDefinition } from "./EmailInput";
import { useInteractiveList } from "@/modules/react/hooks";
import { Seperator } from "@/modules/common/client/components";

export type IEmailsInputProps = {
  value?: IEmailInput[];
} & IEmailsInputDefinition &
  IEmailsInputConfig &
  Partial<Omit<FormGroupProps, "onChange">> &
  IPersonalProfileDistinguisher;

export interface IEmailsInputDefinition {
  emailInputDefinition: IEmailInputDefinition;
  emailsLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IEmailsInputConfig {
  defaultItem?: IEmailInput;
  maxCount?: number;
  onChange?: (emails: IEmailInput[]) => void;
}

export const EmailsInput = (props: IEmailsInputProps) => {
  const {
    value,
    emailInputDefinition,
    emailsLabel,
    addButton,
    removeButton,
    defaultItem,
    maxCount,
    onChange,
    personalContext,
    ...formGroupProps
  } = props;

  const {
    list: emailInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(defaultItem ?? EmailInputDefault, value, onChange);
  const { labelText, ...restRemoveButton } = removeButton;
  return (
    <Row>
      <Column {...{ sm: 0, md: 8, lg: 4 }}>
        {/* <Label {...emailsLabel} /> */}
      </Column>
      <Column {...{ sm: 4, md: 8, lg: 12 }}>
        {emailInputs.map((value, i) => (
          <EmailInput
            personalContext={personalContext}
            value={value}
            {...emailInputDefinition}
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
          </EmailInput>
        ))}
        {(!maxCount || emailInputs.length < maxCount) && (
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
