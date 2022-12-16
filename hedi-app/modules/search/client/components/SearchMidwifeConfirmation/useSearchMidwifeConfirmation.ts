import { useUser } from "@/modules/auth/client/hooks";
import { IWizard } from "@/modules/common/types";
import { dateToString } from "@/modules/common/utils/functions";
import {
  requestMyMidwifeCareConnections,
  upsertMidwifeCareRequest,
} from "@/modules/networking/client/request";
import {
  IMidwifeCareConnection,
  myMidwifeCareConnectionsAPIUrl,
} from "@/modules/networking/types";
import { IMidwifeCareRequestInput } from "@/modules/networking/types/IMidwifeCareRequest";
import { hasActiveCareRequest } from "@/modules/networking/utils/connections";
import { useMyProfile } from "@/modules/profile/client/hooks";
import { requestProfilesByRoutes } from "@/modules/profile/client/request/requestProfilesByRoutes";
import { IMidwife } from "@/modules/profile/types/IMidwife";
import { ISearchInputParams } from "@/modules/search/types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SearchMidwifeStates } from "../SearchMidwifeWizard/StateManagement";

type IWithSelected<T> = T & {
  isSelected: boolean;
};
type IWithDisabled<T> = T & {
  isDisabled: boolean;
};

export const useSearchMidwifeConfirmation = (
  lang: string,
  wizard?: IWizard
) => {
  const [user, isLoading] = useUser();
  const { data: careConnections } = useSWR<IMidwifeCareConnection[]>(
    [myMidwifeCareConnectionsAPIUrl, lang, user?.name],
    (_, theLang, username) =>
      username
        ? requestMyMidwifeCareConnections(theLang).then(
            x => (x || []) as IMidwifeCareConnection[]
          )
        : [],
    {
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (user?.role === "midwife") {
      wizard?.back(SearchMidwifeStates.SEARCH_RESULT);
    }
  }, [user]);
  const [profile, profileIsLoading] = useMyProfile(user, lang);

  const searchParams =
    wizard?.getWizardData<ISearchInputParams>("searchParams") ?? null;

  const careRequest =
    wizard?.getWizardData<IMidwifeCareRequestInput>("careRequest") ?? null;

  const [midwives, setMidwives] = useState<
    IWithSelected<IWithDisabled<IMidwife>>[]
  >([]);
  const [isNetworkRequest, setIsNetworkRequest] = useState(false);
  const networkRequestChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsNetworkRequest(e.target.checked);
  };
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaveError, setHasSaveError] = useState(false);
  const [hasNoRecipient, setHasNoRecipient] = useState(false);
  const [freeText, setFreeText] = useState("");
  const [usedFreeTextChars, setUsedFreeTextChars] = useState(0);
  const [duplicateRecipients, setDuplicateRecipients] = useState<string[]>([]);
  const maxFreeTextLength = 500;
  const freeTextChangeHandler = (text: string) => {
    setUsedFreeTextChars(text.length);
    setFreeText(text);
  };

  useEffect(() => {
    requestProfilesByRoutes(lang, careRequest?.recipients || []).then(
      profiles =>
        setMidwives(
          profiles?.map(item => {
            const hasActivCareConn = hasActiveCareRequest(
              item.route,
              careConnections
            );
            return {
              ...(item as IMidwife),
              isSelected: !hasActivCareConn,
              isDisabled: hasActivCareConn,
            };
          }) || []
        )
    );
  }, []);
  useEffect(() => {
    setHasNoRecipient(
      !(midwives.filter(x => x.isSelected).length || isNetworkRequest)
    );
  }, [midwives, isNetworkRequest]);
  useEffect(() => {
    if (!careConnections) return;
    setMidwives(prevList => {
      prevList
        .filter(mid => hasActiveCareRequest(mid.route, careConnections))
        .forEach(mid => {
          mid.isSelected = false;
          mid.isDisabled = true;
        });
      return [...prevList];
    });
  }, [careConnections]);
  const profileSelectionChangeHandler = (checked: boolean, index: number) => {
    setMidwives(prev => {
      prev[index].isSelected = checked;
      return [...prev];
    });
  };

  const sendRequestHandler = () => {
    if (usedFreeTextChars > maxFreeTextLength || hasNoRecipient) {
      return;
    }
    setIsSaving(true);
    setHasSaveError(false);
    setDuplicateRecipients([]);
    upsertMidwifeCareRequest(lang, {
      careTypes: searchParams?.cares,
      languages: careRequest?.languages,
      services: careRequest?.services,
      body: freeText,
      recipients: midwives.map(mid => mid.route),
    })
      .then(res => {
        if (res.success)
          wizard?.next(undefined, { key: "careRequest", value: res.data });
        else {
          setHasSaveError(true);
          if (res.errors) {
            const recipients = (res.errors as any)["recipients"] as string[];
            if (recipients && recipients.length)
              setDuplicateRecipients(recipients);
          }
        }
      })
      .finally(() => setIsSaving(false));
  };
  const cancelRequestHandler = () => {
    wizard?.back(SearchMidwifeStates.SEARCH_RESULT);
  };

  return {
    profile,
    postalCode: searchParams?.plz,
    expectedDeliveryDate: dateToString(
      searchParams?.date ? new Date(parseInt(searchParams?.date)) : undefined
    ),
    careTypes: searchParams?.cares || [],
    languages: careRequest?.languages || [],
    services: careRequest?.services || [],
    midwives,
    sendRequestHandler,
    cancelRequestHandler,
    usedFreeTextChars,
    maxFreeTextLength,
    freeTextChangeHandler,
    profileSelectionChangeHandler,
    isNetworkRequest,
    networkRequestChangeHandler,
    isSaving,
    hasSaveError,
    hasNoRecipient,
    duplicateRecipients,
  };
};
