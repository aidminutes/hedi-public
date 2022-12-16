import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { EmailInputDefault, IEmailInput } from "../../../../types";

export const useEmailInput = (
  initialValue?: IEmailInput,
  defaultValue = EmailInputDefault,
  onChange?: (emailInput: IEmailInput) => void
) => {
  const parsers: IConverterMap<IEmailInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.dataKind,
    email: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.email,
    dataVisibility: (e: number) => (e ? e : defaultValue.dataVisibility),
  };

  return useCombinedInputs(parsers, initialValue ?? defaultValue, onChange);
};
