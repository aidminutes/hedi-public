import { requestMyProfile } from "@/modules/profile/client/request";
import { useLocaleInfo } from "@/modules/shell/client/contexts";
import { useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { CURRENT_USER_SWR_KEY, ICurrentUser } from "../../types";
import { useUser } from "./useUser";

export const useCurrentUser = (): [
  ICurrentUser | undefined,
  KeyedMutator<void | ICurrentUser>
] => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | undefined>(
    undefined
  );
  const [user] = useUser();
  const {
    active: { locale },
  } = useLocaleInfo();

  const { data, mutate: currentUserMutate } = useSWR(CURRENT_USER_SWR_KEY, _ =>
    requestMyProfile(locale)
      .then(profile => {
        let cUser: ICurrentUser = { email: "" };
        if (profile) {
          let email = "";
          if (profile?.emails && profile?.emails.length > 0) {
            email = profile?.emails[0].email;
          }
          cUser = {
            familyName: profile?.familyName,
            givenName: profile?.givenName,
            email: email,
            image: profile?.image,
            preferredUserName:
              profile?.givenName +
              (profile?.familyName ? " " + profile?.familyName : ""),
          };
        }
        return cUser as ICurrentUser;
      })
      .catch(error => {
        console.error("error", error);
      })
  );

  useEffect(() => {
    if (user) {
      currentUserMutate();
    }
  }, [user?.uuid]);

  useEffect(() => {
    if (data) {
      setCurrentUser(data);
    } else {
      setCurrentUser(undefined);
    }
  }, [data]);

  return [currentUser, currentUserMutate];
};
