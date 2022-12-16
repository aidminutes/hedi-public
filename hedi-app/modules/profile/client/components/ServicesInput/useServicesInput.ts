import { IComponent, ISelectComponent } from "@/modules/components";
import { useEffect, useState } from "react";
import { filterAndGroup } from "./utils";
import { IServiceSelectProps } from "./ServiceSelect";

export const useServicesInput = (
  selected = [] as string[],
  components = [] as IComponent[],
  professionFilter?: string,
  onChange?: (data: string[]) => void
) => {
  const [serviceSelects, setServiceSelects] = useState<IServiceSelectProps[]>(
    []
  );

  useEffect(() => {
    const serviceSelects = filterAndGroup(
      selected,
      components,
      professionFilter
    );
    setServiceSelects(prev =>
      serviceSelects.map(s => {
        const select = prev.find(p => p.id === s.id) ?? s;
        select.selected = s.selected;
        select.onChange = routes => {
          select.selected = routes;
          handleItemChange(select);
        };
        return select;
      })
    );
  }, [components, professionFilter, selected]);

  const handleItemChange = (item: IServiceSelectProps) => {
    setServiceSelects(prev => {
      const i = prev.findIndex(p => p.id === item.id);
      if (i < 0) {
        return prev;
      } else {
        const newState = [...prev];
        newState[i] = item;
        if (onChange) onChange(newState.flatMap(s => s.selected ?? []));
        return newState;
      }
    });
  };

  return serviceSelects;
};
