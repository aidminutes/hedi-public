import {
  IBodyComponent,
  ILabelComponent,
  ISelectComponent,
  ITextInputComponent,
} from "@/modules/components";
import { Location } from "@/modules/map/types";
import { ISearchProfileFilter } from "@/modules/search/types/ISearchProfileFilter";

export interface ISearchProfileFilterProps {
  hasFilter?: boolean;
  hasResult?: boolean;
  filterLabel: ILabelComponent;
  toFilterLabel: ILabelComponent;
  zipcodeInput: ITextInputComponent;
  perimeterSelect: ISelectComponent;
  filterBody: IBodyComponent;
  zipcodeHintLabel: ILabelComponent;
  resetLabel: ILabelComponent;
  zipcodeErrorMessage: ILabelComponent;
  onFilter?: (filter: ISearchProfileFilter) => void;
  filter?: ISearchProfileFilter;
  onLocationChange?: (location: Location) => void;
  defaultDistance?: string;
  isNotSearchedYet?: boolean;
}
