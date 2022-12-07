import React from "react";
import { useServiceSelection } from "./useServiceSelect";
import { SelectableTile, Tile, Tag } from "carbon-components-react";
import { ChevronDown16, ChevronUp16 } from "@carbon/icons-react";
import { ISelectComponent } from "@/modules/components";

export type IServiceSelectProps = IServiceSelectContent &
  IServiceSelectDefinition &
  IServiceSelectConfig;

export interface IServiceSelectContent {
  selected?: string[];
}

export interface IServiceSelectDefinition extends ISelectComponent {
  addServiceText?: string;
}

export interface IServiceSelectConfig {
  onChange?: (routes: string[]) => void;
}

export const ServiceSelect = (props: IServiceSelectProps) => {
  const { id, items, selected, labelText, addServiceText, onChange } = props;
  const {
    isExpanded,
    handleExpandToggle,
    selectItems,
    handleItemToggle,
    handleItemRemove,
  } = useServiceSelection(id, items, selected, onChange);
  const selection = selectItems.filter(item => item.selected);
  return (
    <Tile
      aria-expanded={isExpanded}
      className={`hedi--service-selection${isExpanded ? " is-expanded" : ""}`}>
      <div
        className="hedi--service-selection__head"
        onClick={() => handleExpandToggle()}>
        <h4>{labelText}</h4>
        <span className="bx--tile__checkmark">
          {isExpanded ? <ChevronUp16 /> : <ChevronDown16 />}
        </span>
        {selection.length > 0 ? (
          selection.map(s => (
            <Tag
              type={"blue"}
              key={s.route}
              filter
              onClose={() => handleItemRemove(s.route)}>
              {s.label}
            </Tag>
          ))
        ) : (
          <Tag type={"warm-gray"}>{addServiceText ?? "Hinzufügen"}</Tag>
        )}
      </div>

      <div className="hedi--service-selection__content">
        {selectItems.map(s => (
          <SelectableTile
            key={s.route}
            value={s.route}
            selected={s.selected}
            onChange={() => handleItemToggle(s)}>
            {s.label}
          </SelectableTile>
        ))}
      </div>
    </Tile>
  );
};
