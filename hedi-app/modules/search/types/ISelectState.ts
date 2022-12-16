export type ISelectState<T, G = string> = {
  defaultSelected: string[];
  onChange: (selected: G[], selectedItems: T[]) => void;
};
