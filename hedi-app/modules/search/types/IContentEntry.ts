import { IHighlightedContent } from "@/modules/search/types/IHighlightedContent";

export interface IContentEntry {
  contentTitle: string;
  contentBody: string;
  contentId: string;
  site: string;
  internalId: string;
  highlightedContent: IHighlightedContent;
  documentType: string;
}
