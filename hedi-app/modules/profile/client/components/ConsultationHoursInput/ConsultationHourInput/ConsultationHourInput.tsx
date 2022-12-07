import { Column, Row } from "carbon-components-react";
import {
  ITextInputComponent,
  TextInput,
  ISelectComponent,
  Select,
} from "@/modules/components";
import { IConsultationHourInput } from "../../../../types";
import { useConsultationHourInput } from "./useConsultationHourInput";

export type IConsultationHourInputProps = {
  value?: IConsultationHourInput;
} & IConsultationHourInputDefinition &
  IConsultationHourInputConfig;

export interface IConsultationHourInputDefinition {
  weekdayTitle?: string;
  weekdaySelect: ISelectComponent;
  startTimeTitle?: string;
  startTimeTextInput: ITextInputComponent;
  endTimeTitle?: string;
  endTimeTextInput: ITextInputComponent;
  availabilityTitle?: string;
  availabilitySelect: ISelectComponent;
}

interface IConsultationHourInputConfig {
  defaultValue?: IConsultationHourInput;
  onChange?: (consultationHourInput: IConsultationHourInput) => void;
}

export const ConsultationHourInput: React.FC<IConsultationHourInputProps> = props => {
  const {
    value,
    weekdayTitle,
    weekdaySelect,
    startTimeTitle,
    startTimeTextInput,
    endTimeTitle,
    endTimeTextInput,
    availabilityTitle,
    availabilitySelect,
    defaultValue,
    onChange,
    children,
  } = props;

  const {
    weekday,
    startTime,
    endTime,
    availability,
    state,
  } = useConsultationHourInput(value, defaultValue, onChange);
  return (
    <Row className="hedi--edit-profile__centered-row hedi--consultation-hours__row">
      <Column {...{ lg: 5, md: 2, sm: 4 }}>
        <Select useItemIndex={true} {...weekday} {...weekdaySelect} />
      </Column>
      <Column {...{ lg: 2, md: 1, sm: 2 }}>
        <TextInput {...startTime} {...startTimeTextInput} />
      </Column>
      <Column {...{ lg: 1, md: 1, sm: 0 }}>bis</Column>
      <Column {...{ lg: 2, md: 1, sm: 2 }}>
        <TextInput {...endTime} {...endTimeTextInput} />
      </Column>
      <Column {...{ lg: 5, md: 2, sm: 4 }}>
        <Select useItemIndex={true} {...availability} {...availabilitySelect} />
      </Column>
      <Column
        lg={{ span: 1 }}
        md={{ span: 1, offset: 0 }}
        sm={{ span: 2, offset: 2 }}>
        {children}
      </Column>
      <input
        id="consultationHour"
        name="consultationHour"
        readOnly
        value={JSON.stringify(state)}
        hidden
      />
    </Row>
  );
};
