import {
  Column,
  FormGroup,
  FormGroupProps,
  Row,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
  IBodyComponent,
  Body,
} from "@/modules/components";
import { ILanguageLevelInput, LanguageLevelInputDefault } from "../../../types";
import {
  ILanguageLevelInputDefinition,
  LanguageLevelInput,
} from "./LanguageLevelInput";
import { useInteractiveList } from "@/modules/react/hooks";

export type ILanguageSkillsInputProps = {
  value?: ILanguageLevelInput[];
  isShowLanguageNotice?: boolean;
} & ILanguageSkillsInputDefinition &
  ILanguageSkillsInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface ILanguageSkillsInputDefinition {
  languageSkillsLabel: ILabelComponent;
  languageLevelInputDefinition: ILanguageLevelInputDefinition;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
  midwifeSearchLanguageNotice: IBodyComponent;
}

interface ILanguageSkillsInputConfig {
  defaultItem?: ILanguageLevelInput;
  onChange?: (languageLevels: ILanguageLevelInput[]) => void;
}

export const LanguageSkillsInput = (props: ILanguageSkillsInputProps) => {
  const {
    value,
    isShowLanguageNotice,
    languageSkillsLabel,
    languageLevelInputDefinition,
    addButton,
    removeButton,
    midwifeSearchLanguageNotice,
    defaultItem,
    onChange,
    ...formGroupProps
  } = props;

  const {
    list: languageLevelInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(
    defaultItem ?? LanguageLevelInputDefault,
    value,
    onChange
  );
  const { labelText, ...restRemoveButton } = removeButton;
  const {
    languageSelect: { labelText: languageTitle },
    fluencySelect: { labelText: fluencyTitle },
  } = languageLevelInputDefinition;
  return (
    <>
      <Row>
        <Column>
          {languageLevelInputs?.map((value, i) => (
            <LanguageLevelInput
              value={value}
              key={`${value?.language}${i}`}
              {...languageLevelInputDefinition}
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
            </LanguageLevelInput>
          ))}
        </Column>
      </Row>
      <Row>
        <Column>
          <Button
            {...addButton}
            renderIcon={Add32}
            onClick={handleAddClick}
            tooltipPosition="right"
          />
        </Column>
        {!!isShowLanguageNotice && (
          <Column>
            <div className="hedi--required__hint">
              <Body {...midwifeSearchLanguageNotice} />
            </div>
          </Column>
        )}
      </Row>
    </>
  );
};
