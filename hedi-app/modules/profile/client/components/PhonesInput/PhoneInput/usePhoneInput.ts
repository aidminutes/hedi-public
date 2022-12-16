import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IPhoneInput, PhoneInputDefault } from "../../../../types";

export const usePhoneInput = (
  initialValue?: IPhoneInput,
  defaultValue = PhoneInputDefault,
  onChange?: (phoneInput: IPhoneInput) => void
) => {
  const parsers: IConverterMap<IPhoneInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.dataKind,
    phone: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.phone,
    phoneKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.phoneKind,
    dataVisibility: (e: number) => (e ? e : defaultValue.dataVisibility),
  };

  return useCombinedInputs(parsers, initialValue ?? defaultValue, onChange);
};
