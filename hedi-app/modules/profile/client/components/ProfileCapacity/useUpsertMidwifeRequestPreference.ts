import { FormEventHandler, useState } from "react";
import useSWR from "swr";
import {
  IMidwifeRequestPreference,
  IMidwifeRequestPreferenceInput,
  IUpsertMidwifeRequestPreferenceResponse,
  MidwifeRequestPreferenceInputDefault,
} from "@/modules/networking/types";
import {
  requestMyMidwifeRequestPreference,
  upsertMidwifeRequestPreference,
} from "@/modules/networking/client/request";
import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";
import { useUser } from "@/modules/auth/client/hooks";

export function useUpsertMidwifeRequestPreference(lang: string) {
  const [user, isLoading] = useUser();
  const { data, error, isValidating, mutate } = useSWR(
    user ? [user?.name] : null,
    _ =>
      requestMyMidwifeRequestPreference().then(
        data =>
          ({
            success: false,
            data,
          } as IUpsertMidwifeRequestPreferenceResponse)
      )
  );
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const parsers: IConverterMap<IMidwifeRequestPreferenceInput> = {
    searchable: e => !state.searchable,
    anonymousRequest: e => !state.anonymousRequest,
    directCareRequest: e => !state.directCareRequest,
    radius: e => parseInt((e.imaginaryTarget || e.target).value || "0"),
    defaultCapacity: e =>
      parseInt((e.imaginaryTarget || e.target).value || "0"),
  };
  const { state, ...inputStateMap } = useCombinedInputs(
    parsers,
    data?.data ?? MidwifeRequestPreferenceInputDefault
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const {
      type,
      route,
      ...midwifeRequestPreference
    } = state as IMidwifeRequestPreference;
    const hasErrors = false;
    if (!hasErrors) {
      mutate(
        upsertMidwifeRequestPreference(
          midwifeRequestPreference,
          route,
          lang
        ).then(resp => {
          if (resp?.success) {
            setIsSuccessfullySaved(true);
          }
          return resp;
        })
      );
    }
  };

  const onSaveHandler = (onCapacityEditClose: Function) => {
    const {
      type,
      route,
      ...midwifeRequestPreference
    } = state as IMidwifeRequestPreference;

    setIsSaving(true);
    setIsSuccessfullySaved(false);
    mutate(
      upsertMidwifeRequestPreference(
        midwifeRequestPreference,
        route,
        lang
      ).then(resp => {
        if (resp?.success) {
          setIsSuccessfullySaved(true);
          onCapacityEditClose();
        }
        setIsSaving(false);
        return resp;
      })
    );
  };

  return {
    ...inputStateMap,
    isValidating,
    isSuccessfullySaved,
    isSaving,
    onSaveHandler,
    handleSubmit,
    error,
  };
}
