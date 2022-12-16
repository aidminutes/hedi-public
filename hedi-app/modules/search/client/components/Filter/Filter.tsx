import React from "react";
import { Button } from "carbon-components-react";
import { FilterReset16 } from "@carbon/icons-react";
import { useSearchFilter, ISearchFilterProps } from "./useSearchFilter";
import { Checkbox } from "@/modules/components";
export const Filter = (props: ISearchFilterProps) => {
  const { types, handleChange, resetFilter, activeFilters } = useSearchFilter(
    props
  );
  return (
    <div className="hedi--search__filter">
      {types &&
        types.map((type, index) => (
          <Checkbox
            onChange={(e, _, __) => handleChange(e, type.id)}
            id={type.id || ""}
            key={type.id || "" + index}
            labelText={type.text || "bl"}
            checked={activeFilters.includes(type.id || "Article")}
          />
        ))}
      <Button
        renderIcon={FilterReset16}
        // TODO description
        iconDescription="Filter zurücksetzen"
        hasIconOnly
        onClick={() => resetFilter()}
      />
    </div>
  );
};
