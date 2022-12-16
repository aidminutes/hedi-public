import { ISelectItem } from "@/modules/components";
import { ICountedTag, CountedTag } from "../CountedTag";
import { useCountedTagMultiSelect } from "./useCountedTagMultiSelect";

export type ICountedTagMultiSelectProps = Pick<ICountedTag, "type"> & {
  defaultSelected?: string[];
  counts?: Record<string, number>;
  hideZeroCounted?: boolean;
  hideNotSelected?: boolean;
  filter?: boolean;
  items: ISelectItem[];
  onChange?: (selected: string[], selectedItems: ISelectItem[]) => void;
};

export const CountedTagMultiSelect = (props: ICountedTagMultiSelectProps) => {
  const { type, ...rest } = props;
  const items = useCountedTagMultiSelect(rest);
  return (
    <>
      {items
        .filter(
          item =>
            (props.hideNotSelected ? !!item.checked : true) &&
            (props.hideZeroCounted ? item.count > 0 : true)
        )
        .map(item => (
          <CountedTag
            type={type}
            key={item.route}
            defaultChecked={item.checked}
            filter={props.filter}
            {...item}
          />
        ))}
    </>
  );
};
