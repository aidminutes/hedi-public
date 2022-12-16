import { IContentEntry } from "../../types";
import {
  solrFieldNameBuilder,
  SolrFieldType,
  solrInternalDocIdField,
} from "../solr";

export function transformSolrResultToContentEntry(
  entity: any,
  lang: string,
  highlightingContent: any
): IContentEntry {
  const title = solrFieldNameBuilder(
    SolrFieldType.Fulltext,
    true,
    "content__title",
    true,
    lang
  );
  const name = solrFieldNameBuilder(
    SolrFieldType.Fulltext,
    true,
    "taxonomy__name",
    true,
    lang
  );
  const body = solrFieldNameBuilder(
    SolrFieldType.Fulltext,
    true,
    "content__components__body",
    true,
    lang
  );
  const description = solrFieldNameBuilder(
    SolrFieldType.Fulltext,
    true,
    "taxonomy__description",
    true,
    lang
  );
  const contentType = solrFieldNameBuilder(
    SolrFieldType.String,
    false,
    "content__type"
  );
  const vocabId = solrFieldNameBuilder(
    SolrFieldType.String,
    false,
    "taxonomy__vid"
  );

  return {
    contentTitle: entity[title] ?? entity[name],
    contentId: entity.id,
    contentBody: entity[body] ?? entity[description],
    internalId: entity[solrInternalDocIdField],
    site: entity.site,
    documentType: entity[contentType] ?? entity[vocabId],
    highlightedContent: {
      contentId: entity.id,
      highlightedBody:
        highlightingContent["fuzzy_fulltext"] === undefined
          ? highlightingContent[body]?.pop()
          : highlightingContent["fuzzy_fulltext"]?.pop() ||
            highlightingContent[description]?.pop() ||
            highlightingContent[body]?.pop(),
      highlightedTitle:
        highlightingContent[title]?.pop() || highlightingContent[name]?.pop(),
    },
  };
}
