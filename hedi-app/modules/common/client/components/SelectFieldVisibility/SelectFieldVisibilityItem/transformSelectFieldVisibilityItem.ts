import { ISelectItem } from "@/modules/components";
export interface ISelectFieldVisibilityItem extends Omit<ISelectItem, "route"> {
  value?: number;
  onChange: (value: number) => void;
}

export function transformSelectFieldVisibilityItem(
  props: ISelectFieldVisibilityItem
) {
  const { label, index, value, onChange } = props;

  let fieldClassName = `hedi--field-visibility__item`;
  if (index || index === 0) {
    fieldClassName = `${fieldClassName}${
      index === 0
        ? " public"
        : index === 1
        ? " registered-user"
        : " connected-user"
    }`;
    if (value || value === 0) {
      fieldClassName = `${fieldClassName}${index === value ? " selected" : ""}`;
    }
  }

  return { itemText: label, fieldClassName, index, onChange };
}
