export interface ISearchResultStats {
  type: string; // (filter type/name, e.g. service, or language)
  hits: Record<string, number>; //(e.g. de: 5, or /profiledataservice/0 : 7)
}

export interface IWithResultStats {
  stats: ISearchResultStats[];
}
