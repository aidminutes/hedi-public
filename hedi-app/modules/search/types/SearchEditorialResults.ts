import { IArticleEntry } from "@/modules/editorial/article/types";
import { ICategory } from "@/modules/editorial/category/types";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { IPage } from "@/modules/common/types";
import { ISearchResponse } from ".";

export type SearchEditorialResults =
  | IArticleEntry
  | ICategory
  | IGlossaryTerm
  | IPage;

export interface ISearchEditorialResponse
  extends ISearchResponse<SearchEditorialResults> {}
