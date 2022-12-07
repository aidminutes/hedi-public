import {
  ISearchEditorialInput,
  ISearchEditorialProps,
  SearchEntityType,
  ISearchFilterParam,
} from "../../types";

export function transformSearchEditorialInput(
  searchEditorialProps: ISearchEditorialProps
): ISearchEditorialInput {
  return {
    searchText: searchEditorialProps.searchText.trim(),
    lang: searchEditorialProps.lang,
    filters: {
      include: [
        {
          type: searchEditorialProps.filter as SearchEntityType,
        } as ISearchFilterParam,
      ],
    },
  };
}
