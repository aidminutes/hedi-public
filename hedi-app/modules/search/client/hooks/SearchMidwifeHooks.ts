import { IErrorResponse } from "@/modules/common/error";
import { jsonFetcher } from "@/modules/common/utils";
import {
  ICareTypeDateRangeForView,
  IProfileSearchResponse,
  searchMidwifeAPIUrl,
} from "../../types";
import useSWR from "swr";

export function useSearchMidwife(
  services: string[],
  languages: string[],
  lang: string = "de",
  location: string,
  distance: string,
  careTypeDateRanges: ICareTypeDateRangeForView[]
) {
  const apiPath = searchMidwifeAPIUrl;
  const swrResult = useSWR<IErrorResponse | IProfileSearchResponse>(
    `${services.join(" ")}${languages.join(" ")}${location}`.length > 3
      ? apiPath +
          encodeURI(
            "lang=" +
              lang +
              services.map(service => `&services=${service}`).join("") +
              languages.map(language => `&languages=${language}`).join("") +
              "&location=" +
              location +
              "&distance=" +
              distance +
              careTypeDateRanges
                .filter(item => item.enabled && item.selected)
                .map(
                  item =>
                    `&${item.careType}FromDate=${item.fromDate}&${item.careType}ToDate=${item.toDate}`
                )
                .join("")
          )
      : null,
    url => jsonFetcher(url).then(res => res?.data ?? null)
  );
  return { ...swrResult };
}
