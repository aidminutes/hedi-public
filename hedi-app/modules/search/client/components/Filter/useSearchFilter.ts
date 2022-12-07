import { ILabelComponent } from "@/modules/components";
import { useState, useEffect } from "react";

export interface ISearchFilterProps {
  types: ILabelComponent[];
  handleFilter: Function;
}

export function useSearchFilter(props: ISearchFilterProps) {
  const { types, handleFilter } = props;
  // TODO implement other possible filter options
  const [filter, setFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    constructFilterString(activeFilters);
  }, [activeFilters]);

  useEffect(() => {
    handleFilter(filter);
  }, [filter]);

  const resetFilter = function () {
    setActiveFilters([]);
  };

  const constructFilterString = (filter: string[]) => {
    if (filter.length === 0) {
      setFilter("");
      return;
    }
    if (filter.length === 1) {
      setFilter(filter[0]);
      return;
    }
    setFilter(filter.join(" OR "));
  };

  const handleChange = (checked: boolean, filterType: any) => {
    if (checked) {
      addToFilters(filterType);
      return;
    }
    removeFromFilters(filterType);
  };

  const addToFilters = (filter: string) => {
    setActiveFilters(prev => [...prev, filter]);
  };

  const removeFromFilters = (filter: string) => {
    setActiveFilters(activeFilters.filter(item => item !== filter));
  };
  return { filter, types, handleChange, resetFilter, activeFilters };
}
