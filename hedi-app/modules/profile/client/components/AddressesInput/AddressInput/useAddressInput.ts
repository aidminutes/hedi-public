import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { AddressInputDefault, IAddressInput } from "../../../../types";

export const useAddressInput = (
  initialValue?: IAddressInput,
  defaultValue = AddressInputDefault,
  onChange?: (addressInput: IAddressInput) => void
) => {
  const parsers: IConverterMap<IAddressInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.dataKind,
    city: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.city,
    postalCode: (e: ChangeEvent<HTMLSelectElement>) => {
      const matches = e.target.value?.match(/\d+/);
      if (matches && matches.length > 0) {
        return matches[0];
      }
      return defaultValue.postalCode;
    },
    dataVisibility: (e: number) => {
      return e ? e : defaultValue.dataVisibility;
    },
    street: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.street,
    streetNumber: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.streetNumber,
    additionalInfo: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.additionalInfo,
    detailsVisibility: (e: number) => (e ? e : defaultValue.detailsVisibility),
  };

  return useCombinedInputs(parsers, initialValue ?? defaultValue, onChange);
};
