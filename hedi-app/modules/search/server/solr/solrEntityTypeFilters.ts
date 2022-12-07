import { SearchEntityType } from "../../types/ISearchInput";
import { solrFieldNameBuilder, SolrFieldType } from "./solrFieldNameBuilder";

export const solrEntityTypeFilters = {
  Article: `${solrFieldNameBuilder(
    SolrFieldType.String,
    false,
    "content__type"
  )}:article`,
  Category: `${solrFieldNameBuilder(
    SolrFieldType.String,
    false,
    "taxonomy__vid"
  )}:categories`,
  GlossaryTerm: `${solrFieldNameBuilder(
    SolrFieldType.String,
    false,
    "taxonomy__vid"
  )}:glossary_term`,
  // TODO if the pages were implemented: pages: "ss_type:page",
} as Record<SearchEntityType, string>;
