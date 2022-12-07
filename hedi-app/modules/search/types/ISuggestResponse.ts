import { ISearchResponse, ISolrSuggestItem, ISuggestEntry } from ".";

export interface ISuggestResponse extends ISearchResponse<ISuggestEntry> {}

export interface ISuggestEndPoint {
  endPointUrl: string;
  dictionaryName: string;
}

export const SolrDefaultSuggestionEndPoint: ISuggestEndPoint = {
  endPointUrl: "/suggest",
  dictionaryName: "defaultSuggester",
};

export const getSolrSuggestArticleEndPoint = (
  lang: string
): ISuggestEndPoint => ({
  endPointUrl: "/suggest/article/" + lang,
  dictionaryName: lang + "ArticleSuggester",
});

export const getSolrSuggestProfileEndPoint = (
  lang: string
): ISuggestEndPoint => ({
  endPointUrl: "/suggest/profile/" + lang,
  dictionaryName: lang + "ProfileSuggester",
});

export interface ISolrSuggestion {
  numFound: number;
  suggestions: ISolrSuggestItem[];
}
