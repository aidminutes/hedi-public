import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";
import { IContentEntry, ISearchInput } from "../../types";
import {
  transformParamsToSolrRequestString,
  transformSolrResultToContentEntry,
} from "../functions";
import { requestFromSolr } from "./requestFromSolr";

export async function searchServer(
  input: ISearchInput
): Promise<IContentEntry[] | IHTTPError> {
  const reqBody = transformParamsToSolrRequestString(input, true); // TODO getHighlighted als param in input?
  const response = await requestFromSolr("/select", reqBody);

  if (response.status !== 200) return responseToIHTTPError(response);
  const jsonResponse = await response.json();

  const content = jsonResponse.response.docs;
  if (!content?.length) return { status: 200, message: "No results yet!" };

  const highlightingContent = jsonResponse.highlighting;
  return content.map((entity: any) =>
    transformSolrResultToContentEntry(
      entity,
      input.lang,
      highlightingContent[entity.id]
    )
  ) as IContentEntry[];
}
