import React, { ReactNode } from "react";
import { ILabelComponent, Label } from "@/modules/components";
import { IEntity } from "@/modules/model";
import {
  Checkmark16,
  CheckmarkOutline16,
  ErrorOutline16,
} from "@carbon/icons-react";
import { IMatchingElement } from "@/modules/search/types";
import { generateLayoutClassnames } from "@/modules/shell/client/components/Layout/generateLayoutClassnames";

type EntityItem = Pick<IEntity, "route" | "label">;
export function isEntityItem(obj: any): obj is EntityItem {
  return !!obj.route && !!obj.label;
}
export function isMatchingElement(obj: any): obj is IMatchingElement<string> {
  return obj.value !== undefined && obj.matchStatus !== undefined;
}

export enum CheckboxIconType {
  Normal = 0,
  Outline = 1,
  Both = 2,
}

export interface LabeledListProps {
  listItems: string[] | EntityItem[] | IMatchingElement<string>[];
  labelDefinition?: ILabelComponent;
  label?: string;
  className?: string;
  isChecklist?: boolean;
  isHighlightingMatches?: boolean;
  checklistIconType?: CheckboxIconType;
  concatenateValues?: boolean;
  maxVisibleItems?: number;
  toggleExpand?: () => void;
}

function getValue(
  item: string | EntityItem | IMatchingElement<string>,
  iconType?: CheckboxIconType,
  isChecklist?: boolean
): ReactNode {
  const isMatching = isMatchingElement(item);
  let value = isEntityItem(item) ? item.label : isMatching ? item.value : item;

  if (isChecklist) {
    let icon: ReactNode;
    let notMatchedIcon: ReactNode;
    icon =
      iconType === CheckboxIconType.Outline ? (
        <>
          <CheckmarkOutline16 className="hedi--labeled-list__checkmark" />{" "}
          {value}
        </>
      ) : iconType === CheckboxIconType.Both ? (
        <>
          <Checkmark16 className="hedi--labeled-list__checkmark" /> {value}
        </>
      ) : (
        <>
          <Checkmark16 className="hedi--labeled-list__checkmark" /> {value}
        </>
      );
    notMatchedIcon =
      iconType === CheckboxIconType.Outline ? (
        <>
          <ErrorOutline16 className="hedi--labeled-list__checkmark inactive" />{" "}
          {value}
        </>
      ) : iconType === CheckboxIconType.Both ? (
        <>
          <ErrorOutline16 className="hedi--labeled-list__checkmark inactive" />{" "}
          {value}
        </>
      ) : (
        <>{value}</>
      );
    let element =
      !isMatching || item.matchStatus || item.foundInProfile
        ? icon
        : notMatchedIcon;
    return element;
  }
  return value;
}

function getClassName(
  item: string | EntityItem | IMatchingElement<string>,
  isHighlighting: boolean
) {
  return isMatchingElement(item) && isHighlighting
    ? item.matchStatus
      ? "active"
      : item.foundInProfile
      ? "half-active"
      : "inactive"
    : "";

  //return '';
}

export const LabeledList: React.FC<LabeledListProps> = ({
  labelDefinition,
  label,
  listItems,
  concatenateValues,
  isChecklist,
  checklistIconType,
  isHighlightingMatches,
  maxVisibleItems,
  toggleExpand,
  className,
}) => {
  if (
    maxVisibleItems &&
    maxVisibleItems > 0 &&
    listItems.length > maxVisibleItems
  ) {
    listItems = listItems.slice(0, maxVisibleItems);
  }

  return (
    <div className={`hedi--labeled-list${className ? ` ${className}` : ""}`}>
      {labelDefinition ? (
        <Label
          className="hedi--labeled-list__headline"
          {...labelDefinition}
          labelKind="div"
        />
      ) : (
        <div className="hedi--labeled-list__headline">{label}</div>
      )}
      <ul>
        {concatenateValues ? (
          <li>{listItems.map(item => getValue(item)).join(", ")}</li>
        ) : (
          listItems.map(item => (
            <li
              key={
                isEntityItem(item)
                  ? item.route
                  : isMatchingElement(item)
                  ? item.value
                  : item
              }
              className={getClassName(
                item,
                isHighlightingMatches ? isHighlightingMatches : false
              )}>
              {getValue(item, checklistIconType, isChecklist)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
