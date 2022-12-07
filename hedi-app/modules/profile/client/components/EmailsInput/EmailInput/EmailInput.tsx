import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";
import { IEmailInput, IPersonalProfileDistinguisher } from "../../../../types";
import { useEmailInput } from "./useEmailInput";
import {
  SelectFieldVisibility,
  Seperator,
} from "@/modules/common/client/components";

export type IEmailInputProps = {
  value?: IEmailInput;
} & IEmailInputDefinition &
  IEmailInputConfig &
  IPersonalProfileDistinguisher;

export interface IEmailInputDefinition {
  emailLabel: ILabelComponent;
  dataKindSelect: ISelectComponent;
  emailTextInput: ITextInputComponent;
  dataVisibilitySelect: ISelectComponent;
}

export interface IEmailInputConfig {
  defaultValue?: IEmailInput;
  onChange?: (emailInput: IEmailInput) => void;
}

export const EmailInput: React.FC<IEmailInputProps> = props => {
  const {
    value,
    defaultValue,
    onChange,
    children,
    personalContext,
    ...definition
  } = props;

  const { dataKind, email, dataVisibility } = useEmailInput(
    value,
    defaultValue,
    onChange
  );

  const {
    emailLabel,
    dataKindSelect,
    emailTextInput,
    dataVisibilitySelect,
  } = definition;

  return (
    <>
      <Row className="hedi--edit-profile__centered-row">
        <Column md={6} lg={9}>
          <TextInput {...email} {...emailTextInput} />
        </Column>
        <Column md={2} lg={6}>
          <div className="hedi--flex-end">
            <SelectFieldVisibility
              personalContext={personalContext}
              {...dataVisibility}
              {...dataVisibilitySelect}
            />
          </div>
        </Column>
      </Row>
      {!personalContext && (
        <Row>
          <Column md={6} lg={9}>
            <Select useItemIndex={true} {...dataKind} {...dataKindSelect} />
          </Column>
        </Row>
      )}
      {children && (
        <Row>
          <Column md={{ span: 2, offset: 6 }} lg={{ span: 2, offset: 13 }}>
            {children}
          </Column>
        </Row>
      )}
    </>
  );
};
