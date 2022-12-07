import { ChangeEvent } from "react";
import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";
import {
  ILanguageLevelInput,
  LanguageLevelInputDefault,
} from "../../../../types";

export const useLanguageLevelInput = (
  initialValue?: ILanguageLevelInput,
  defaultValue = LanguageLevelInputDefault,
  onChange?: (languageLevelInput: ILanguageLevelInput) => void
) => {
  const parsers: IConverterMap<ILanguageLevelInput> = {
    language: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ?? defaultValue.language,
    fluency: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.fluency,
  };

  return useCombinedInputs(parsers, initialValue ?? defaultValue, onChange);
};
