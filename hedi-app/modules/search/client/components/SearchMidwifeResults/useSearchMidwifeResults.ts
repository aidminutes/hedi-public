import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { upsertMidwifeCareRequest } from "@/modules/networking/client/request";
import { ICareType } from "@/modules/networking/types/ICareType";
import { IService } from "@/modules/profile/types/taxonomyTypes/IService";
import { ILanguage } from "@/modules/common/types/ILanguage";
import { RankedScoredIProfile } from "@/modules/search/types";
import { IWizard } from "@/modules/common/types";
import { IMidwifeCareRequestInput } from "@/modules/networking/types";
import { useUser } from "@/modules/auth/client/hooks";

export function useSearchMidwifeResults({
  rawSelectedMidwifesLabelText,
  queryCareTypes,
  queryLanguages,
  queryServices,
  careRequestUrl,
  lang,
  profileResults,
  isPartOfWizard,
  wizard,
}: {
  rawSelectedMidwifesLabelText: string;
  queryCareTypes?: Pick<ICareType, "route" | "label">[];
  queryLanguages?: Pick<ILanguage, "route" | "label">[];
  queryServices?: Pick<IService, "route" | "label">[];
  careRequestUrl?: string;
  lang: string;
  profileResults: RankedScoredIProfile[];
  isPartOfWizard?: boolean;
  wizard?: IWizard;
}) {
  const router = useRouter();
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isFirstSelection, setIsFirstSelection] = useState<boolean>(false);

  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [selectedMidwifesLabelText, setSelectedMidwifesLabelText] = useState(
    ""
  );
  const [user] = useUser();
  const [isMidwifeUser, setIsMidwifeUser] = useState(false);
  useEffect(() => {
    setIsMidwifeUser(user?.role === "midwife");
  }, [user]);

  /* // Notice: This function will be used in "versenden" view at the end of searchMidwife wizard
  const handleRequestCreate = useCallback(
    async (selection: Record<string, boolean>) => {
      setIsCreatingRequest(true);
      const recipients = Object.keys(selection).filter(
        selectionRoute => selection[selectionRoute]
      );
      const res = await upsertMidwifeCareRequest(lang, {
        recipients,
        careTypes: queryCareTypes?.map(c => c.route),
        services: queryServices?.map(s => s.route),
        languages: queryLanguages?.map(l => l.route),
      });

      if (!res.data) {
        console.warn("MidwifeCareRequest could not be created.");
        setIsCreatingRequest(false);
        return;
      }
      if (!careRequestUrl) {
        console.warn("Cannot redirect due to missing care request url.");
        setIsCreatingRequest(false);
        return;
      }
      const redirectUrl = careRequestUrl + `?${res.data.route}`;
      await router.push(redirectUrl);
    },
    [
      router,
      lang,
      careRequestUrl,
      queryServices,
      queryLanguages,
      queryCareTypes,
    ]
  );
  */

  const handleRequestCreate = () => {
    if (!!isPartOfWizard && !!wizard) {
      const recipients = Object.keys(selection).filter(
        selectionRoute => selection[selectionRoute]
      );
      const midwifeList: IMidwifeCareRequestInput = {
        recipients,
        careTypes: queryCareTypes?.map(c => c.route),
        services: queryServices?.map(s => s.route),
        languages: queryLanguages?.map(l => l.route),
      };
      wizard?.next<IMidwifeCareRequestInput>(undefined, {
        key: "careRequest",
        value: midwifeList,
      });
    }
  };

  useEffect(() => {
    setSelectedMidwifesLabelText(
      rawSelectedMidwifesLabelText.replace(
        "[SELECTED_MIDWIFES_COUNT]",
        selectedCount + ""
      )
    );
  }, [selectedCount]);

  const handleRequestCheck = (checked: boolean, route: string) => {
    if (selectedCount === 0) {
      setIsFirstSelection(true);
    } else {
      setIsFirstSelection(false);
    }
    setSelection(prev => {
      if (prev[route] === checked) return prev;
      const newState = { ...prev };
      newState[route] = checked;

      let count = 0;
      Object.values(newState).forEach(value => {
        count += value ? 1 : 0;
      });
      setSelectedCount(count);
      return newState;
    });
  };

  useEffect(() => {
    setSelection({});
    setSelectedCount(0);
    setIsFirstSelection(false);
  }, [queryLanguages, queryServices, profileResults]);

  return {
    isMidwifeUser,
    selectedCount,
    selection,
    isFirstSelection,
    selectedMidwifesLabelText,
    isCreatingRequest,
    handleRequestCheck,
    handleRequestCreate,
  };
}
