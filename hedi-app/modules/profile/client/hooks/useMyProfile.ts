import { useEffect, useState } from "react";
import { IUserInfo } from "@/modules/auth/types";
import { requestMyProfile } from "../request";
import { UserProfile } from "../../types";

export function useMyProfile(
  user: IUserInfo | undefined,
  lang: string
): [UserProfile | null, boolean] {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyProfile = async () => {
      setIsLoading(true);
      const profile = await requestMyProfile(lang).catch(() =>
        setIsLoading(false)
      );
      if (profile) setProfile(profile);

      setIsLoading(false);
    };

    // we can trigger without waiting on user info
    // api does serverside validation anyways
    fetchMyProfile();
  }, [user?.name, lang]);

  return [profile, isLoading];
}
