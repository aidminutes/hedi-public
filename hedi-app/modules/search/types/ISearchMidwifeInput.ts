import { RequiredBy } from "@/modules/common/utils";
import { ICareTypeDateRange } from "./ICareTypeDateRange";
import { ISearchInput } from "./ISearchInput";

export interface ISearchMidwifeScoreMultiplier {
  languages: number;
  availability: number;
  services: number;
  distance: number;
  careTypes: number;
}

export interface ISearchMidwifeInput
  extends RequiredBy<ISearchInput, "locationData"> {
  careTypeDateRanges: ICareTypeDateRange[];
  services: string[];
  languages: string[];
  scoreMultipliers?: ISearchMidwifeScoreMultiplier;
}
