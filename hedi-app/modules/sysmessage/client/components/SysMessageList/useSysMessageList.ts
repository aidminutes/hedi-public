import useSWR from "swr";
import { requestMySysMessages } from "../../request";

export function useSysMessageList(lang: string) {
  const response = useSWR(
    [lang],
    (lang: string) => requestMySysMessages(lang),
    {
      revalidateOnFocus: false,
      refreshInterval: 10000, // refresh every 10 seconds
      revalidateIfStale: false,
    }
  );
  return { ...response };
}
