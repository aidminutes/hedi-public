import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IWebsiteInput, WebsiteInputDefault } from "../../../../types";

export const useWebsiteInput = (
  initialValue?: IWebsiteInput,
  defaultValue = WebsiteInputDefault,
  onChange?: (websiteInput: IWebsiteInput) => void
) => {
  const parsers: IConverterMap<IWebsiteInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.dataKind,
    website: (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value ?? defaultValue.website,
    dataVisibility: (e: number) => (e ? e : defaultValue.dataVisibility),
  };

  return useCombinedInputs(parsers, initialValue ?? defaultValue, onChange);
};
