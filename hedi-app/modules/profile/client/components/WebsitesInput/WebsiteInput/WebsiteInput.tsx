import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";
import { IWebsiteInput } from "../../../../types";
import { useWebsiteInput } from "./useWebsiteInput";
import {
  SelectFieldVisibility,
  Seperator,
} from "@/modules/common/client/components";

export type IWebsiteInputProps = {
  value?: IWebsiteInput;
} & IWebsiteInputDefinition &
  IWebsiteInputConfig;

export interface IWebsiteInputDefinition {
  websiteLabel: ILabelComponent;
  dataKindSelect: ISelectComponent;
  websiteTextInput: ITextInputComponent;
  dataVisibilitySelect: ISelectComponent;
}

export interface IWebsiteInputConfig {
  defaultValue?: IWebsiteInput;
  onChange?: (websiteInput: IWebsiteInput) => void;
}

export const WebsiteInput: React.FC<IWebsiteInputProps> = props => {
  const { value, defaultValue, onChange, children, ...definition } = props;

  const { dataKind, website, dataVisibility } = useWebsiteInput(
    value,
    defaultValue,
    onChange
  );

  const {
    websiteLabel,
    dataKindSelect,
    websiteTextInput,
    dataVisibilitySelect,
  } = definition;

  return (
    <>
      <Row className="hedi--edit-profile__centered-row">
        <Column md={6} lg={9}>
          <TextInput {...website} {...websiteTextInput} />
        </Column>
        <Column md={2} lg={6}>
          <div className="hedi--flex-end">
            <SelectFieldVisibility
              {...dataVisibility}
              {...dataVisibilitySelect}
            />
          </div>
        </Column>
      </Row>
      <Row>
        <Column md={6} lg={9}>
          <Select useItemIndex={true} {...dataKind} {...dataKindSelect} />
        </Column>
      </Row>
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
