import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
  INumberInputComponent,
  NumberInput,
} from "@/modules/components";
import {
  IAddressInput,
  IPersonalProfileDistinguisher,
} from "../../../../types";
import { useAddressInput } from "./useAddressInput";
import {
  SelectFieldVisibility,
  Seperator,
} from "@/modules/common/client/components";

export type IAddressInputProps = {
  value?: IAddressInput;
} & IAddressInputDefinition &
  IAddressInputConfig &
  IPersonalProfileDistinguisher;

export interface IAddressInputDefinition {
  addressLabel: ILabelComponent;
  dataVisibilitySelect: ISelectComponent;
  dataKindSelect: ISelectComponent;
  cityTextInput: ITextInputComponent;
  postalCodeTextInput: ITextInputComponent;
  detailsVisibilitySelect: ISelectComponent;
  streetTextInput: ITextInputComponent;
  streetNumberTextInput: ITextInputComponent;
  additionalInfoTextInput: ITextInputComponent;
}

export interface IAddressInputConfig {
  defaultValue?: IAddressInput;
  onChange?: (addressInput: IAddressInput) => void;
}

export const AddressInput: React.FC<IAddressInputProps> = props => {
  const {
    value,
    defaultValue,
    onChange,
    children,
    personalContext,
    ...definition
  } = props;

  const {
    dataKind,
    city,
    postalCode,
    dataVisibility,
    street,
    streetNumber,
    detailsVisibility,
    additionalInfo,
  } = useAddressInput(value, defaultValue, onChange);

  const {
    addressLabel,
    dataKindSelect,
    dataVisibilitySelect,
    cityTextInput,
    postalCodeTextInput,
    detailsVisibilitySelect,
    streetTextInput,
    streetNumberTextInput,
    additionalInfoTextInput,
  } = definition;
  return (
    <>
      <Row className="hedi--edit-profile__centered-row">
        <Column md={6} lg={9}>
          <TextInput {...city} {...cityTextInput} />
        </Column>
        <Column md={1} lg={4}>
          <TextInput {...postalCodeTextInput} {...postalCode} />
        </Column>
        <Column md={1} lg={2}>
          <div className="hedi--row-icon__wrap">
            <SelectFieldVisibility
              personalContext={personalContext}
              {...dataVisibility}
              {...dataVisibilitySelect}
            />
          </div>
        </Column>
      </Row>
      {!personalContext && (
        <>
          <Row>
            <Column md={6} lg={9}>
              <Select useItemIndex={true} {...dataKind} {...dataKindSelect} />
            </Column>
          </Row>
        </>
      )}
      <Seperator color="gray" type="m" />

      <Row className="hedi--edit-profile__centered-row">
        <Column md={6} lg={9}>
          <TextInput {...street} {...streetTextInput} />
        </Column>
        <Column md={1} lg={4}>
          <TextInput {...streetNumber} {...streetNumberTextInput} />
        </Column>
        <Column md={1} lg={2}>
          <div className="hedi--row-icon__wrap">
            <SelectFieldVisibility
              personalContext={personalContext}
              {...detailsVisibility}
              {...detailsVisibilitySelect}
            />
          </div>
        </Column>
      </Row>
      <Row>
        <Column md={6} lg={9}>
          <TextInput {...additionalInfo} {...additionalInfoTextInput} />
        </Column>
      </Row>
      {children && (
        <Row>
          <Column md={{ span: 2, offset: 6 }} lg={{ span: 2, offset: 13 }}>
            {children}
          </Column>
        </Row>
      )}
      <Seperator color="gray" type="m" />
    </>
  );
};
