import {
  IGroupedSearchFilter,
  ISearchFilterParam,
  ISearchFilters,
  isIGroupedSearchFilter,
  SearchEntityType,
} from "../../types";

export const transformSolrSearchFilters = (
  filters?: ISearchFilters,
  entityTypeFields?: Record<SearchEntityType, string>,
  solrEntityTypeFilters?: Record<SearchEntityType, string>
): string[] => {
  const result: string[] = [];
  if (filters) {
    if (filters.include?.length) {
      for (const includeFilter of filters.include) {
        if (isIGroupedSearchFilter(includeFilter))
          result.push(
            transformGroupedSearchFilter(
              includeFilter,
              entityTypeFields,
              solrEntityTypeFilters
            )
          );
        else {
          const singleFilter = transformSingleSearchFilter(
            includeFilter,
            entityTypeFields,
            solrEntityTypeFilters
          );
          if (singleFilter) result.push(singleFilter);
        }
      }
    }
    if (filters.exclude?.length) {
      for (const excludeFilter of filters.exclude) {
        if (isIGroupedSearchFilter(excludeFilter))
          result.push(
            transformGroupedSearchFilter(
              excludeFilter,
              entityTypeFields,
              solrEntityTypeFilters,
              true
            )
          );
        else {
          const singleFilter = transformSingleSearchFilter(
            excludeFilter,
            entityTypeFields,
            solrEntityTypeFilters,
            true
          );
          if (singleFilter) result.push(singleFilter);
        }
      }
    }
  }
  return result.filter(filterItem => filterItem);
};

const transformGroupedSearchFilter = (
  filter: IGroupedSearchFilter,
  entityTypeFields?: Record<SearchEntityType, string>,
  solrEntityTypeFilters?: Record<SearchEntityType, string>,
  isExclude?: boolean
): string => {
  const parts: string[] = [];
  for (const param of filter.filterParams)
    if (isIGroupedSearchFilter(param))
      parts.push(
        transformGroupedSearchFilter(
          param,
          entityTypeFields,
          solrEntityTypeFilters,
          isExclude
        )
      );
    else {
      const singleFilter = transformSingleSearchFilter(
        param,
        entityTypeFields,
        solrEntityTypeFilters,
        isExclude
      );
      if (singleFilter) parts.push(singleFilter);
    }

  return parts.length
    ? "(" + parts.join(") " + filter.operation + " (") + ")"
    : "";
};

const transformSingleSearchFilter = (
  filter: ISearchFilterParam,
  entityTypeFields?: Record<SearchEntityType, string>,
  entityTypeFilters?: Record<SearchEntityType, string>,
  isExclude?: boolean
): string | null => {
  let strFilter = "";
  if (!filter.route) {
    strFilter = entityTypeFilters?.[filter.type] || "";
  } else {
    const field = entityTypeFields?.[filter.type];
    if (!field) return null;
    strFilter = field + `:[${filter.route} TO ${filter.route}]`; // TODO should it be always a ranged query?
  }
  if (!strFilter) return null;
  if (isExclude) return "(*:* AND -" + strFilter + ")";
  return strFilter;
};
