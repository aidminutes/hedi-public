import { BusinessProfileType } from "@/modules/profile/types";

export type SearchEntityType =
  | "Profile"
  | "Article"
  | "Category"
  | "GlossaryTerm";

export interface ProfileFilterParam extends ISearchFilterParam {
  type: "Profile";
  subtype: BusinessProfileType;
}

export const isProfileFilterParam = (
  filter: ISearchFilterParam
): filter is ProfileFilterParam => {
  return filter && filter.type === "Profile";
};

export interface ArticleFilterParam {
  type: "Article";
}

export interface CategoryFilterParam {
  type: "Category";
}

export interface GlossaryTermFilterParam {
  type: "GlossaryTerm";
}

export interface ISearchFilterParam {
  type: SearchEntityType;
  route?: string;
}

export interface IGroupedSearchFilter {
  filterParams: SearchFilterParam[];
  operation: "AND" | "OR";
}

export const isIGroupedSearchFilter = (obj: any): obj is IGroupedSearchFilter =>
  obj && Array.isArray(obj.filterParams) && obj.operation;

export interface IAndGroupedSearchFilter extends IGroupedSearchFilter {
  operation: "AND";
}

export interface IORGroupedSearchFilter extends IGroupedSearchFilter {
  operation: "OR";
}

export type SearchFilterParam = IGroupedSearchFilter | ISearchFilterParam;

export interface ISearchFilters {
  include?: SearchFilterParam[];
  exclude?: SearchFilterParam[];
}

interface ILocationDataBase {
  distance?: number;
  searchJustInLocation?: boolean;
}

export interface IProcessedLocationData extends ILocationDataBase {
  latLong?: string;
  location?: undefined; // mutually exclusive
}

export interface IUnprocessedLocationData extends ILocationDataBase {
  location?: string;
  latLong?: undefined; // mutually exclusive
}

type ILocationData = IProcessedLocationData | IUnprocessedLocationData;

interface IPagination {
  take: number;
  skip?: number;
}

export interface ISearchInput {
  lang: string;
  searchText?: string;
  filters?: ISearchFilters;
  locationData?: ILocationData;
  pagination?: IPagination;
}

export type ISearchProfileInput = ISearchInput;

export type ISearchEditorialInput = ISearchInput;

export type IQuickSearchInput = ISearchInput;

export type ISuggestInput = ISearchInput;
