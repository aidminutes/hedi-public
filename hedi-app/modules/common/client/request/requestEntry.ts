import { jsonFetcher } from "@/modules/common/utils";
import { entryAPIUrl } from "../../types";
import { IEntry } from "../../types/IEntry";
import { IAPIResponse } from "@/modules/model";

export const requestEntry = (
  route: string,
  dstLang?: string
): Promise<IEntry | null> => {
  const parameters = new URLSearchParams({ route });
  if (dstLang) parameters.append("dstLang", dstLang);
  return jsonFetcher<IAPIResponse<IEntry>>(
    `${entryAPIUrl}/?${parameters.toString()}`
  ).then(res => res?.data ?? null);
};
