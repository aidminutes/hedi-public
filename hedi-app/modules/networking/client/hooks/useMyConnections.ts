import useSWR from "swr";
import { jsonPost } from "@/modules/common/utils";
import { myConnectionsAPIUrl, IConnection } from "@/modules/networking/types";

export const useMyConnections = <T = IConnection>(
  language = "de",
  apiUrl = myConnectionsAPIUrl,
  initialConnections?: T[],
  refreshInterval = 60000
) => {
  const { data: connections, error, mutate } = useSWR<T[]>(
    [apiUrl, language, initialConnections],
    (url, lang) => jsonPost(url, { lang }).then(res => res?.data ?? null),
    {
      fallbackData: initialConnections,
      refreshInterval,
      errorRetryInterval: 60000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const isLoading = !connections && !error;
  return {
    isLoading,
    connections,
    error,
    mutate,
  };
};
