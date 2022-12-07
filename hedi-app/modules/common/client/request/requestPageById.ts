import { jsonFetcher } from "@/modules/common/utils";
import { IPage, pageByIdAPIUrl } from "../../types";
import { IAPIResponse } from "@/modules/model";

export const requestPageById = (
  id: string,
  lang: string
): Promise<IPage | null> => {
  const parameters = new URLSearchParams({ id, lang });

  return jsonFetcher<IAPIResponse<IPage>>(
    `${pageByIdAPIUrl}/?${parameters.toString()}`
  ).then(res => res?.data ?? null);
};
