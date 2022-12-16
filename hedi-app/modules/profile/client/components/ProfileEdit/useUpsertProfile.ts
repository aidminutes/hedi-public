import { ChangeEvent, FormEventHandler, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";
import {
  UserProfileInput,
  PersonalInputDefault,
  ProfessionalInputDefault,
  UserProfileInputDefault,
} from "../../../types";
import { editMyProfile } from "../../request/editMyProfile";
import { useUser } from "@/modules/auth/client/hooks";
import { CURRENT_USER_SWR_KEY } from "@/modules/auth/types";

export function useUpsertProfile(lang: string) {
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);

  const { mutate: globalMutate } = useSWRConfig();
  const [userInfo, _] = useUser();
  const defaultProfile =
    userInfo?.role === "professional"
      ? ProfessionalInputDefault
      : PersonalInputDefault;

  const { data, error, isValidating, mutate } = useSWR(
    [userInfo?.route, lang, userInfo?.role],
    _ => editMyProfile(undefined, lang, userInfo?.role)
  );
  const profile: UserProfileInput = data?.data ?? defaultProfile;

  const parsers: IConverterMap<UserProfileInput> = {
    profession: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target?.value ?? ProfessionalInputDefault.profession, // HACK actually wrong the first selectitem should be set
    namePrefix: null,
    givenName: (e: ChangeEvent<HTMLInputElement>) =>
      e.target?.value ?? UserProfileInputDefault.givenName,
    familyName: null,
    birthDate: e => e,
    addresses: e => e,
    phones: e => e,
    emails: e => e,
    websites: e => e,
    consultationHours: e => e,
    languageLevels: e => e,
    services: e => e,
  };

  for (const key in parsers) {
    if (!(key in profile)) delete (parsers as any)[key];
  }

  const { state, ...inputStateMap } = useCombinedInputs(parsers, profile);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    // TODO validate inputs
    const hasErrors = false;
    if (!hasErrors) {
      mutate(
        editMyProfile(state as UserProfileInput, lang, userInfo?.role).then(
          resp => {
            if (resp?.success && resp?.route) {
              setIsSuccessfullySaved(true);
              //router.push(resp.route);
            }
            return resp;
          }
        )
      );

      globalMutate(CURRENT_USER_SWR_KEY);
    }
  };

  return {
    ...inputStateMap,
    isValidating,
    isSuccessfullySaved,
    handleSubmit,
    type: data?.type ?? "Personal",
  };
}
