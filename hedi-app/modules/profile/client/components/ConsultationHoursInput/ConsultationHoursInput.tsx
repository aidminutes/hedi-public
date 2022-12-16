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
  ConsultationHourInputDefault,
  IConsultationHourInput,
} from "../../../types";
import {
  ConsultationHourInput,
  IConsultationHourInputDefinition,
} from "./ConsultationHourInput";
import { useInteractiveList } from "@/modules/react/hooks";

export type IConsultationHoursInputProps = {
  value?: IConsultationHourInput[];
} & IConsultationHoursInputDefinition &
  IConsultationHoursInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface IConsultationHoursInputDefinition {
  consultationHoursLabel: ILabelComponent;
  weekdayTitle?: string;
  startTimeTitle?: string;
  endTimeTitle?: string;
  availabilityTitle?: string;
  consultationHourInputDefinition: IConsultationHourInputDefinition;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IConsultationHoursInputConfig {
  defaultItem?: IConsultationHourInput;
  onChange?: (consultationHours: IConsultationHourInput[]) => void;
}

export const ConsultationHoursInput = (props: IConsultationHoursInputProps) => {
  const {
    value,
    consultationHoursLabel,
    weekdayTitle,
    startTimeTitle,
    endTimeTitle,
    availabilityTitle,
    consultationHourInputDefinition,
    addButton,
    removeButton,
    defaultItem,
    onChange,
    ...formGroupProps
  } = props;
  const {
    list: consultationHourInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(
    defaultItem ?? ConsultationHourInputDefault,
    value,
    onChange
  );
  const { labelText, ...restRemoveButton } = removeButton;
  return (
    <Row>
      <Column>
        {/* <TableHeader>{endTimeTitle ?? "Bis"}</TableHeader> */}

        {consultationHourInputs?.map((value, i) => (
          <ConsultationHourInput
            {...consultationHourInputDefinition}
            key={`${i}${value?.weekday}${value?.availability}`}
            value={value}
            onChange={item => handleItemChange(item, i)}>
            <div className="hedi--flex-end">
              <Button
                {...restRemoveButton}
                hasIconOnly
                renderIcon={TrashCan32}
                onClick={_ => handleRemoveClick(i)}
                tooltipPosition="left"
              />
            </div>
          </ConsultationHourInput>
        ))}
        <Button
          {...addButton}
          renderIcon={Add32}
          onClick={handleAddClick}
          tooltipPosition="right"
        />
      </Column>
    </Row>
  );
};
