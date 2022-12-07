export enum SolrFieldType {
  Integer = "it",
  Boolean = "b",
  String = "s",
  Fulltext = "t",
  Date = "d",
  DateRange = "dr",
  Location = "loc",
  CopyField = "",
}

export const solrFieldNameBuilder = (
  fieldType: SolrFieldType,
  isMultiValue: boolean,
  fieldPath: string,
  translatable: boolean = false,
  lang?: string
) => {
  if (fieldType == SolrFieldType.CopyField) return fieldPath;
  const prefix =
    fieldType == SolrFieldType.Fulltext
      ? isMultiValue
        ? "tm_X3b"
        : "ts_X3b"
      : fieldType.valueOf() + (isMultiValue ? "m" : "s");

  const fieldName = prefix + "_" + (translatable ? "{lang}_" : "") + fieldPath;
  return lang ? fieldName.replace("{lang}", lang) : fieldName;
};

export const getSolrLanguageFilter = (lang: string) =>
  `ss_search_api_language:${lang}`;

export const solrInternalDocIdField = "ss_search_api_id";
