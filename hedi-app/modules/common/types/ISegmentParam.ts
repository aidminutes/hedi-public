import { ParsedUrlQuery } from "querystring";

export interface ISegmentParam extends ParsedUrlQuery {
  segments?: string[];
}
