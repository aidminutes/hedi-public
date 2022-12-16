import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import {
  ConsultationHourInputDefault,
  IConsultationHourInput,
} from "../../../../types";

export const useConsultationHourInput = (
  initialValue?: IConsultationHourInput,
  defaultValue = ConsultationHourInputDefault,
  onChange?: (consultationHourInput: IConsultationHourInput) => void
) => {
  const parsers: IConverterMap<IConsultationHourInput> = {
    weekday: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.weekday,
    startTime: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.startTime,
    endTime: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.endTime,
    availability: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.availability,
  };

  return useCombinedInputs(parsers, initialValue ?? defaultValue, onChange);
};
