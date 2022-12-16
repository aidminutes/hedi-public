import useSWR from "swr";
import { jsonFetcher } from "@/modules/common/utils";
import {
  IOrganisation,
  UserProfile,
  profileDetailAPIUrl,
} from "../../../types";
import { useUser } from "@/modules/auth/client/hooks/useUser";

export function useProfileView(
  fallbackData: UserProfile | IOrganisation,
  route: string
) {
  const [user] = useUser();

  const response = useSWR<UserProfile | IOrganisation>(
    !!user ? [profileDetailAPIUrl, route, fallbackData] : null,
    (url, data) =>
      jsonFetcher(`${url}/?route=${data}`).then(res => res?.data ?? null),
    {
      fallbackData,
      revalidateOnMount: true,
      refreshInterval: 5000,
      loadingTimeout: 5000,
      errorRetryInterval: 60000,
    }
  );
  return { ...response };
}
