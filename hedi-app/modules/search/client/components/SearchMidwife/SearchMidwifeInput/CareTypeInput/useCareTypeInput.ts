import { useEffect, useState } from "react";
import { CareType, ICareType } from "@/modules/networking/types/ICareType";

export const useCareTypeInput = (
  selected?: ICareType[],
  defaultSelected?: ICareType[],
  onChange?: (selected: CareType[], selectedItems: ICareType[]) => void
) => {
  const [careTypeInputs, setCareTypeInputs] = useState(
    defaultSelected
      ? defaultSelected.map(item => ({ route: item.route, label: item.label }))
      : undefined
  );

  useEffect(() => {
    if (selected) {
      setCareTypeInputs(_ => {
        if (onChange)
          onChange(
            selected.map(c => c.route),
            selected
          );
        return selected;
      });
    }
  }, [selected]);

  const handleChange = (checked: boolean, careType: ICareType) => {
    setCareTypeInputs(prev => {
      if (!!prev?.find(c => c.route === careType.route) === checked)
        return prev;
      else {
        const newState = prev;
        if (checked) newState?.push(careType);
        else {
          const id = newState?.findIndex(c => c.route === careType.route) ?? -1;
          if (id > -1) newState?.splice(id, 1);
        }
        if (onChange)
          onChange(newState?.map(c => c.route) ?? [], newState ?? []);
        return newState;
      }
    });
  };

  return {
    handleCareTypesInputChange: handleChange,
  };
};
