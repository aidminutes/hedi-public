import {
  ChangeEvent,
  FormEventHandler,
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import useSWR from "swr";
import {
  IPersonal,
  IPregnancy,
  IPregnancyInput,
  IUpsertPregnancyResponse,
} from "../../../types";
import { requestMyPregnancy, upsertPregnancy } from "../../request";
import { IConverterMap, IInputStateMap } from "@/modules/react/hooks";
import { useUser } from "@/modules/auth/client/hooks";
import { dateToString, isBoolean } from "@/modules/common/utils";
import { useMyProfile } from "../../hooks";
import { editMyProfile } from "../../request/editMyProfile";
import { IPregnancyEditTools } from "./PregnancyEdit";

export type PregnancyViewKind = "pregnancy-part" | "health-part" | "all";
type PregnancyWithBirthDate = IPregnancy & {
  birthDate?: string;
};

export function useUpsertPregnancy({
  lang,
  viewKind,
  onAfterSave,
  onSaving,
  pregnancyEditRef,
}: {
  lang: string;
  viewKind: PregnancyViewKind;
  onAfterSave?: (pregnancy: IPregnancy, birthDate: string) => void;
  onSaving?: () => void;
  pregnancyEditRef: ForwardedRef<unknown>;
}) {
  const showPregnancyPart = viewKind == "all" || viewKind == "pregnancy-part";
  const showHealthPart = viewKind == "all" || viewKind == "health-part";
  const [user, isLoading] = useUser();
  const [profile, isProfileLoading] = useMyProfile(user, lang);
  const [hasUserHealthData, setHasUserHealthData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isPregnancyLoading, setIsPregnancyLoading] = useState(true);

  const setPregnancy = (pregnancy?: IPregnancy) => {
    if (!pregnancy) return;
    const newInputStateMap = {} as IInputStateMap<PregnancyWithBirthDate>;
    for (const [prop, value] of Object.entries(pregnancy)) {
      newInputStateMap[prop as keyof PregnancyWithBirthDate] = {
        ...inputStateMap[prop as keyof PregnancyWithBirthDate],
        value: pregnancy[prop as keyof IPregnancy],
      } as any;
    }
    newInputStateMap.birthDate = inputStateMap.birthDate;
    setInputStateMap(newInputStateMap);
    setState(prev => ({ birthDate: prev.birthDate, ...pregnancy }));

    setHasUserHealthData(
      isBoolean(pregnancy.prevBirthComplication) ||
        isBoolean(pregnancy.prevBreastfeedingProblem) ||
        isBoolean(pregnancy.prevCSection) ||
        isBoolean(pregnancy.prevPostpartumDepression) ||
        isBoolean(pregnancy.prevPrematureBirth)
    );
  };

  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);
  const [state, setState] = useState<PregnancyWithBirthDate>(
    {} as PregnancyWithBirthDate
  );

  const parsers: IConverterMap<
    (IPregnancy | IPregnancyInput) & { birthDate: string }
  > = {
    expectedDeliveryDate: e => e,
    multiplePregnancy: e => e,
    gravida: e => {
      const nan = isNaN(parseInt(e.imaginaryTarget?.value));
      return nan ? "" : parseInt(e.imaginaryTarget.value);
    },
    para: e => {
      const nan = isNaN(parseInt(e.imaginaryTarget?.value));
      return nan ? "" : parseInt(e.imaginaryTarget.value);
    },
    prevPrematureBirth: e => e,
    prevBirthComplication: e => e,
    prevCSection: e => e,
    prevPostpartumDepression: e => e,
    prevBreastfeedingProblem: e => e,
    birthDate: e => e,
  };
  const emtpyStateObj = Object.entries(parsers).reduce((prev, [key, func]) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const value = func ? func(e) : e.target?.value;
      setState(p => {
        const newState = { ...p, [key]: value };
        return newState;
      });
      setInputStateMap(prev => {
        const prevState = { ...prev };
        prevState[key as keyof PregnancyWithBirthDate].value = value;
        return prevState;
      });
    };
    prev[key as keyof PregnancyWithBirthDate] = {
      value: "",
      onChange: handleChange,
    } as any;
    return prev;
  }, {} as IInputStateMap<PregnancyWithBirthDate>);

  const [inputStateMap, setInputStateMap] = useState<
    IInputStateMap<PregnancyWithBirthDate>
  >(emtpyStateObj);

  const { data, error, mutate } = useSWR(
    user ? [user?.name] : null,
    _ =>
      requestMyPregnancy().then(pregnancy => {
        setIsPregnancyLoading(false);
        if (pregnancy) {
          let { expectedDeliveryDate, ...rest } = pregnancy;
          if (expectedDeliveryDate) {
            expectedDeliveryDate = dateToString(new Date(expectedDeliveryDate));
            pregnancy = { ...rest, expectedDeliveryDate };
          }
          setPregnancy(pregnancy);
        }
        return { success: false, pregnancy } as IUpsertPregnancyResponse;
      }),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    setIsValidForm(
      !!(
        state.birthDate &&
        state.expectedDeliveryDate &&
        state.gravida >= state.para
      )
    );
  }, [state.birthDate, state.expectedDeliveryDate, state.gravida, state.para]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    doSaveData();
  };
  const doSaveData = (
    onSavingFn?: () => void,
    onErrorFn?: () => void,
    onSuccessFn?: () => void
  ) => {
    const { type, route, birthDate, ...pregnancy } = state;
    const hasErrors = false; // TODO client-side validation?
    if (!hasErrors) {
      setIsSaving(true);
      if (onSaving) onSaving();
      if (onSavingFn) onSavingFn();
      mutate(
        upsertPregnancy(pregnancy, route, lang).then(resp => {
          console.log("upsertPregnancy result", resp);
          if (resp?.success) {
            editMyProfile({ birthDate }, lang, user?.role).then(
              profileUpsertResponse => {
                console.log("editMyProfile result", profileUpsertResponse);
                setIsSuccessfullySaved(profileUpsertResponse.success);
                setIsSaving(false);
                if (profileUpsertResponse.success) {
                  if (onAfterSave)
                    onAfterSave(pregnancy as IPregnancy, birthDate || "");
                  if (onSuccessFn) onSuccessFn();
                } else {
                  // TODO show save error
                  if (onErrorFn) onErrorFn();
                }
              }
            );
          } else {
            setIsSaving(false);
            if (onErrorFn) onErrorFn();
          }
          return resp;
        })
      );
    }
  };
  useEffect(() => {
    const birthDate = dateToString((profile as IPersonal)?.birthDate);
    setInputStateMap(prev => {
      const newState = { ...prev };
      newState.birthDate.value = birthDate;
      return newState;
    });
    setState(prev => {
      const newState = { ...prev };
      newState.birthDate = birthDate;
      return newState;
    });
  }, [profile]);
  const doReload = () => {
    setInputStateMap(prev => {
      const prevState = { ...prev };
      prevState.birthDate.value = dateToString(
        (profile as IPersonal)?.birthDate
      );
      return prevState;
    });
    setPregnancy(data?.pregnancy);
  };
  useImperativeHandle(
    pregnancyEditRef,
    () =>
      ({
        upsertData: (onSaving, onError, onSuccess) => {
          doSaveData(onSaving, onError, onSuccess);
        },
        reload: () => {
          doReload();
        },
      } as IPregnancyEditTools)
  );

  useEffect(() => {
    if (!state.gravida) {
      setInputStateMap(prev => {
        const newState = { ...prev };
        newState.gravida.value = 0;
        return newState;
      });
      setState(prev => ({ ...prev, gravida: 0 }));
    }
    if (!state.para) {
      setInputStateMap(prev => {
        const newState = { ...prev };
        newState.para.value = 0;
        return newState;
      });
      setState(prev => ({ ...prev, para: 0 }));
    }
  }, []);

  useEffect(() => {
    if (state.gravida?.toString() == "") {
      setInputStateMap(prev => {
        const newState = { ...prev };
        newState.gravida.value = 0;
        return newState;
      });
      setState(prev => ({ ...prev, gravida: 0 }));
    }
    if (state.para?.toString() == "") {
      setInputStateMap(prev => {
        const newState = { ...prev };
        newState.para.value = 0;
        return newState;
      });
      setState(prev => ({ ...prev, para: 0 }));
    }
  }, [state.gravida, state.para]);

  return {
    ...inputStateMap,
    showHealthPart,
    showPregnancyPart,
    isPregnancyLoading,
    isProfileLoading,
    isSuccessfullySaved,
    handleSubmit,
    doSaveData,
    doReload,
    error,
    pregnancy: data?.pregnancy,
    hasUserHealthData,
    isSaving,
    isValidForm,
  };
}
