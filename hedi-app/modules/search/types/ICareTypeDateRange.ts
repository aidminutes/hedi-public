import { CareType } from "@/modules/networking/types/ICareType";

export interface ICareTypeDateRange {
  careType: CareType;
  fromDate: Date;
  toDate: Date;
}

export interface ICareTypeDateRangeForView extends ICareTypeDateRange {
  title: string;
  enabled: boolean;
  selected: boolean;
}
