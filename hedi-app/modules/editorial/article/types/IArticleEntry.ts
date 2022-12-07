import {
  IEntityLocalized,
  ITag, // ITag,
  IWithType,
} from "@/modules/model";

import { IWithAppStyle, IWithRouteLabel } from "../../types";

export interface IArticleEntry
  extends IEntityLocalized,
    IWithType,
    IWithRouteLabel,
    IWithAppStyle {
  summary?: string;
  tags?: ITag[];
}
export interface IArticleEntryListProps {
  articles: IArticleEntry[];
  headline?: string;
  entryType: EntryType;
}

export type EntryType = "full" | "normal" | "normal-neighbours" | "minimal";
// entryTypes:
// full: (image), breadcrumb, headline, summary, one element per column
// normal: full + less columns then full
// neighbours: breadcrumb, headline, summary, two elements per column
// minimal: breadcrumb, headline,
