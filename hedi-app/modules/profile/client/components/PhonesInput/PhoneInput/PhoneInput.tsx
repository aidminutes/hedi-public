import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";
import { IPersonalProfileDistinguisher, IPhoneInput } from "../../../../types";
import { usePhoneInput } from "./usePhoneInput";
import {
  SelectFieldVisibility,
  Seperator,
} from "@/modules/common/client/components";

export type IPhoneInputProps = {
  value?: IPhoneInput;
} & IPhoneInputDefinition &
  IPhoneInputConfig &
  IPersonalProfileDistinguisher;

export interface IPhoneInputDefinition {
  phoneLabel: ILabelComponent;
  dataKindSelect: ISelectComponent;
  phoneTextInput: ITextInputComponent;
  phoneKindSelect: ISelectComponent;
  dataVisibilitySelect: ISelectComponent;
}

export interface IPhoneInputConfig {
  defaultValue?: IPhoneInput;
  onChange?: (phoneInput: IPhoneInput) => void;
}

export const PhoneInput: React.FC<IPhoneInputProps> = props => {
  const {
    value,
    defaultValue,
    onChange,
    children,
    personalContext,
    ...definition
  } = props;

  const { dataKind, phone, phoneKind, dataVisibility } = usePhoneInput(
    value,
    defaultValue,
    onChange
  );

  const {
    phoneLabel,
    dataKindSelect,
    phoneTextInput,
    phoneKindSelect,
    dataVisibilitySelect,
  } = definition;

  return (
    <>
      <Row className="hedi--edit-profile__centered-row">
        <Column md={5} lg={9}>
          <TextInput {...phone} {...phoneTextInput} />
        </Column>
        <Column md={2} lg={4}>
          <Select {...phoneKind} {...phoneKindSelect} />
        </Column>
        <Column md={1} lg={2}>
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
