import { ISelectItem } from "@/modules/components";
import { Location } from "@/modules/map/types";

export interface ISearchProfileFilter {
  userLocation: Location | null;
  distanceItem: ISelectItem | null;
  isUserDefaultLocation: boolean | null;
}
