import { jsonFetcher } from "@/modules/common/utils";
import { getPagesReportAPIUrl } from "../../types";
import { IPage } from "@/modules/common/types";
import useSWR from "swr";
import { IAPIResponse } from "@/modules/model";

export function getPagesReport() {
  const response = useSWR<IPage[]>(getPagesReportAPIUrl, () =>
    jsonFetcher<IAPIResponse<IPage[]> | null>(getPagesReportAPIUrl).then(
      resp => resp?.data ?? []
    )
  );
  return { ...response };
}
