import {
  Checkbox,
  ILabelComponent,
  ISelectComponent,
  Label,
} from "@/modules/components";
import { CareType, ICareType } from "@/modules/networking/types/ICareType";
import { useCareTypeInput } from "./useCareTypeInput";

export type ICareTypeInputProps = {
  selected?: ICareType[];
} & ICareTypeInputDefinition &
  ICareTypeInputConfig;

export interface ICareTypeInputDefinition {
  careTypesLabel: ILabelComponent;
  careTypeSelect: ISelectComponent;
  careTypesTitle: ILabelComponent;
}

export interface ICareTypeInputConfig {
  defaultSelected?: ICareType[];
  onChange: (selected: CareType[], selectedItems: ICareType[]) => void;
}

export const CareTypeInput = (props: ICareTypeInputProps) => {
  const { selected, defaultSelected, onChange, ...definition } = props;

  const { handleCareTypesInputChange } = useCareTypeInput(
    selected,
    defaultSelected,
    onChange
  );

  const { careTypesLabel, careTypeSelect } = definition;

  return (
    <div className="hedi--search-midwife__care-types">
      <Label {...careTypesLabel} />
      <div className="hedi--search-midwife__care-types__checkbox-wrapper">
        {careTypeSelect.items.map(careTypeItem => (
          <Checkbox
            key={careTypeItem.route}
            defaultChecked={
              !!defaultSelected?.find(c => c.route === careTypeItem.route)
            }
            onChange={(checked: boolean) =>
              handleCareTypesInputChange(
                checked,
                {
                  route: careTypeItem.route,
                  label: careTypeItem.label,
                }! as ICareType
              )
            }
            id={careTypeItem.route}
            labelText={careTypeItem.label}
          />
        ))}
      </div>
    </div>
  );
};
