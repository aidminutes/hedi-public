import { SearchEntityType } from "../../types";
import { solrFieldNameBuilder, SolrFieldType } from "./solrFieldNameBuilder";

export interface IGroupedFields {
  name: string;
  fields: string[];
}

export interface ISolrFilter {
  field: string;
  value: string;
}

export type SolrFilter = ISolrFilter | string;

interface ISolrSearchConfig {
  defaultMaximumResultsCount: number;
  filters: SolrFilter[];
  groupedFields: IGroupedFields[];
  entityTypeFieldsMap?: Record<SearchEntityType, string>;
}

export const searchConfigs = {
  searchMidwife: {
    defaultMaximumResultsCount: 1000,
    filters: [
      {
        field: solrFieldNameBuilder(
          SolrFieldType.String,
          false,
          "profile__bundle"
        ),
        value: "midwife",
      },
      {
        field: solrFieldNameBuilder(
          SolrFieldType.Boolean,
          false,
          "profile__midwife_request_preference__searchable"
        ),
        value: "true",
      },
      {
        field: solrFieldNameBuilder(
          SolrFieldType.Boolean,
          false,
          "profile__midwife_request_preference__direct_care_request"
        ),
        value: "true",
      },
    ],
    groupedFields: [
      {
        name: "meta",
        fields: [
          solrFieldNameBuilder(SolrFieldType.String, true, "profile__path"),
        ],
      },
      {
        name: "daterange",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.DateRange,
            true,
            "profile__calendar_entries__daterange"
          ),
        ],
      },
      {
        name: "services",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.String,
            true,
            "profile__services__path"
          ),
        ],
      },
      {
        name: "careTypes",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.String,
            true,
            "profile__care_types__path"
          ),
        ],
      },
      {
        name: "name",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.Fulltext,
            true,
            "profile__label",
            true
          ),
        ],
      },
      {
        name: "languages",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.String,
            true,
            "profile__language_levels__language__code"
          ),
        ],
      },
      {
        name: "location",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.Location,
            true,
            "profile__addresses__lat_long"
          ),
          solrFieldNameBuilder(
            SolrFieldType.Location,
            true,
            "profile__addresses__lat_long_approx"
          ),
        ],
      },
      {
        name: "midwifeRequestPreferenceRadius",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.Integer,
            false,
            "profile__midwife_request_preference__radius"
          ),
        ],
      },
    ],
    entityTypeFieldsMap: {},
  } as ISolrSearchConfig,

  searchProfile: {
    defaultMaximumResultsCount: 1000,
    filters: [
      {
        field: solrFieldNameBuilder(
          SolrFieldType.String,
          false,
          "profile__bundle"
        ),
        value: "[* TO *]", // `[* TO *]` means: has this property
      },
      `((*:* AND -(${solrFieldNameBuilder(
        // !midwife OR searchable
        SolrFieldType.String,
        false,
        "profile__bundle"
      )}:midwife)) OR ${solrFieldNameBuilder(
        SolrFieldType.Boolean,
        false,
        "profile__midwife_request_preference__searchable"
      )}:true)`,
    ],
    groupedFields: [
      {
        name: "meta",
        fields: [
          solrFieldNameBuilder(SolrFieldType.String, true, "profile__path"),
        ],
      },
      {
        name: "fuzzy_search",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.CopyField,
            true,
            "fuzzy_profile_search"
          ),
        ],
      },
      {
        name: "name",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.Fulltext,
            true,
            "profile__label",
            true
          ),
        ],
      },
      {
        name: "location",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.Location,
            true,
            "profile__addresses__lat_long"
          ),
          solrFieldNameBuilder(
            SolrFieldType.Location,
            true,
            "profile__addresses__lat_long_approx"
          ),
        ],
      },
    ],
    entityTypeFieldsMap: {},
  } as ISolrSearchConfig,

  quickSearch: {
    defaultMaximumResultsCount: 20,
    filters: [
      `(${solrFieldNameBuilder(
        SolrFieldType.String,
        false,
        "content__type"
      )}:[* TO *] OR ${solrFieldNameBuilder(
        SolrFieldType.String,
        false,
        "profile__bundle"
      )}:[* TO *] OR ${solrFieldNameBuilder(
        SolrFieldType.String,
        false,
        "taxonomy__vid"
      )}:glossary_term)`,
    ],
    groupedFields: [
      {
        name: "meta",
        fields: [
          solrFieldNameBuilder(SolrFieldType.String, true, "profile__path"),
        ],
      },
      {
        name: "name",
        fields: [
          solrFieldNameBuilder(
            SolrFieldType.Fulltext,
            true,
            "profile__label",
            true
          ),
          solrFieldNameBuilder(
            SolrFieldType.Fulltext,
            true,
            "content__title",
            true
          ),
          solrFieldNameBuilder(
            SolrFieldType.Fulltext,
            true,
            "taxonomy__name",
            true
          ),
          solrFieldNameBuilder(
            SolrFieldType.Fulltext,
            true,
            "taxonomy__german_term",
            true
          ),
          solrFieldNameBuilder(SolrFieldType.CopyField, true, "fuzzy_label"),
        ],
      },
      {
        name: "bundle",
        fields: [
          solrFieldNameBuilder(SolrFieldType.String, false, "profile__bundle"),
          solrFieldNameBuilder(SolrFieldType.String, false, "taxonomy__vid"),
          solrFieldNameBuilder(SolrFieldType.String, false, "content__type"),
        ],
      },
    ],
    entityTypeFieldsMap: {},
  } as ISolrSearchConfig,

  searchContent: {
    defaultMaximumResultsCount: 1000,
    filters: [
      `(${solrFieldNameBuilder(
        SolrFieldType.String,
        false,
        "content__type"
      )}:[* TO *] OR ${solrFieldNameBuilder(
        SolrFieldType.String,
        false,
        "taxonomy__vid"
      )}:(glossary_term || tags))`,
    ],
    groupedFields: [
      {
        name: "internal",
        fields: [
          "id",
          "site",
          "fuzzy_fulltext",
          solrFieldNameBuilder(SolrFieldType.String, false, "content__type"),
          solrFieldNameBuilder(SolrFieldType.Integer, false, "content__nid"),
          solrFieldNameBuilder(SolrFieldType.String, false, "taxonomy__vid"),
        ],
      },
    ],
    entityTypeFieldsMap: {
      Category: solrFieldNameBuilder(
        SolrFieldType.String,
        false,
        "content__category__path"
      ),
    },
  } as ISolrSearchConfig,
};

export const convertSolrFiltersToString = (filters: SolrFilter[]) => {
  return filters.map(filter => convertSolrFilterToString(filter));
};

export const convertSolrFilterToString = (filter: SolrFilter) => {
  return typeof filter === "string"
    ? filter
    : `${filter.field}:(${filter.value})`;
};

export const getSearchConfigFieldsByGroupName = (
  groupedFields: IGroupedFields[],
  groupName: string,
  lang: string
) => {
  return (
    groupedFields
      .find(group => group.name == groupName)
      ?.fields?.map(field => field.replace("{lang}", lang)) || []
  ); // TODO could have problem with de-CH or we have just two letter langs?
};

export const getSearchConfigEntityTypeFields = (
  searchConfigItem: ISolrSearchConfig,
  lang: string
): Record<SearchEntityType, string> => {
  const result = {} as Record<SearchEntityType, string>;
  if (searchConfigItem.entityTypeFieldsMap)
    for (const prop of Object.keys(
      searchConfigItem.entityTypeFieldsMap
    ) as SearchEntityType[])
      result[prop as SearchEntityType] = searchConfigItem.entityTypeFieldsMap[
        prop as SearchEntityType
      ].replace("{lang}", lang);
  return result;
};

type matchType = "normal" | "exact" | "ranged";

export function makeQueryStringFromGroupedFields(
  groupedFields: IGroupedFields[],
  groupName: string,
  searchText: string | string[],
  lang: string,
  matchType: matchType = "normal"
) {
  return (
    groupedFields
      .find(group => group.name == groupName)
      ?.fields?.map(field => field.replace("{lang}", lang)) // TODO could have problem with de-CH or we have just two letter langs?
      ?.map(field => `${field}:(${prepareTextToSearch(searchText, matchType)})`)
      ?.join(" ") || ""
  );
}

function prepareTextToSearch(
  searchText: string | string[],
  matchType: matchType = "normal"
) {
  if (matchType == "exact")
    return (
      '"' +
      (Array.isArray(searchText) ? searchText.join('" || "') : searchText) +
      '"'
    );
  if (matchType == "ranged") {
    return (Array.isArray(searchText) ? searchText : [searchText])
      .map(value => `[${value} TO ${value}]`)
      .join(" || ");
  } else
    return (
      (Array.isArray(searchText) ? searchText.join(" ") : searchText) ?? ""
    )
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .join(" || ");
}
