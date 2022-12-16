import { Row, Column } from "carbon-components-react";
import { ISelectComponent, Select } from "@/modules/components";
import { ILanguageLevelInput } from "../../../../types";
import { useLanguageLevelInput } from "./useLanguageLevelInput";

export type ILanguageLevelInputProps = {
  value?: ILanguageLevelInput;
} & ILanguageLevelInputDefinition &
  ILanguageLevelInputConfig;

export interface ILanguageLevelInputDefinition {
  languageSelect: ISelectComponent;
  fluencySelect: ISelectComponent;
}

interface ILanguageLevelInputConfig {
  defaultValue?: ILanguageLevelInput;
  onChange?: (languageLevelInput: ILanguageLevelInput) => void;
}

export const LanguageLevelInput: React.FC<ILanguageLevelInputProps> = props => {
  const {
    value,
    languageSelect,
    fluencySelect,
    defaultValue,
    onChange,
    children,
  } = props;

  const { language, fluency, state } = useLanguageLevelInput(
    value,
    defaultValue,
    onChange
  );

  languageSelect.items.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Row className="hedi--edit-profile__centered-row">
      <Column lg={8} md={5}>
        <Select {...language} {...languageSelect} light />
      </Column>
      <Column lg={5} md={2}>
        <Select useItemIndex={true} {...fluency} {...fluencySelect} light />
      </Column>
      <Column md={{ span: 1 }} lg={{ span: 2 }}>
        {children}
      </Column>
    </Row>
  );
};
