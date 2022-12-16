import { IEntry } from "@/modules/common/types";

export interface ISolrSuggestItem {
  term: string;
  payload?: string;
  weight: number;
}

export interface ISuggestEntry {
  term: string;
  route: string;
  weight: number;
  entry: IEntry;
}
