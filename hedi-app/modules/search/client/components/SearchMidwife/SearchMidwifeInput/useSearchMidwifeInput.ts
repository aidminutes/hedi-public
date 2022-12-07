import { useEffect, useState } from "react";
import { PartialBy } from "@/modules/common/utils";
import { ISelectItem } from "@/modules/components";
import { CareType, ICareType } from "@/modules/networking/types/ICareType";
import { ISearchMidwifeInput } from "../types";
import { IService } from "@/modules/profile/types";
import { ILanguage } from "@/modules/common/types/ILanguage";
import { ISearchMidwifeWidgetInput } from "../SearchMidwifeWidget";
import { useRouter } from "next/router";
import { ISearchInputParams } from "@/modules/search/types/ISearchInputParams";
import { IWizard, IWizardData } from "@/modules/common/types";
import { ISelectState } from "@/modules/search/types";

export const useSearchMidwifeInput = ({
  allCareTypes,
  onChange,
  resultsCount,
  rawDescriptionText,
  isPageLoad,
  isPartOfWizard,
  wizard,
}: {
  allCareTypes: ICareType[];
  onChange?: (input: ISearchMidwifeInput) => void;
  resultsCount?: number;
  rawDescriptionText?: string;
  isPageLoad?: boolean;
  isPartOfWizard?: boolean;
  wizard?: IWizard;
}) => {
  const router = useRouter();
  const [hasFilter, setHasFilter] = useState(false);

  let searchParsmsObj: ISearchInputParams | null = null;
  let searchParamsJsonStr: string | undefined;
  if (!!isPartOfWizard && !!wizard) {
    searchParsmsObj = wizard.getWizardData<ISearchInputParams>("searchParams");
  } else {
    const { searchParams } = router.query;
    searchParamsJsonStr = searchParams ? searchParams.toString() : undefined;
    if (!!searchParamsJsonStr) {
      searchParamsJsonStr = atob(searchParamsJsonStr);
    }
    try {
      searchParsmsObj = JSON.parse(
        !!searchParamsJsonStr ? searchParamsJsonStr : "{}"
      );
    } catch {}
  }

  const { plz, date, cares, latlon } = searchParsmsObj as ISearchInputParams;
  const [callSearchOnLoad, setCallSearchOnLoad] = useState(isPageLoad && !!plz);

  const initialCareTypes = (cares || [])
    .map(careItem => allCareTypes.find(ct => ct.route == careItem))
    .filter(x => x) as ICareType[];
  const initialExpectedDeliveryDate = new Date(parseInt(date));
  const initialInput = {
    careTypes: initialCareTypes,
    languages: [],
    services: [],
    expectedDeliveryDate: initialExpectedDeliveryDate,
    pregnancyLatLong: latlon || "",
    pregnancyPlz: plz || "",
  };

  const [input, setInput] = useState<
    PartialBy<ISearchMidwifeInput, "expectedDeliveryDate" | "pregnancyLatLong">
  >(initialInput);

  const careTypeSelectState = {
    defaultSelected: initialCareTypes,
    onChange: (selected: CareType[], selectedItems: ICareType[]) =>
      setInput(prev => {
        const input = { ...prev };
        input.careTypes = selectedItems;
        if (onChange && input.expectedDeliveryDate && input.pregnancyLatLong) {
          onChange(input as ISearchMidwifeInput);
        }
        return input;
      }),
  };

  const languageSelectState: ISelectState<ISelectItem> = {
    defaultSelected: input.languages?.map(l => l.route) || [],
    onChange: (selected: string[], selectedItems: ISelectItem[]) =>
      setInput(prev => {
        const input = { ...prev };
        input.languages = selectedItems;
        if (onChange && input.expectedDeliveryDate && input.pregnancyLatLong) {
          onChange(input as ISearchMidwifeInput);
        }
        return input;
      }),
  };

  const serviceSelectState: ISelectState<ISelectItem> = {
    defaultSelected: input.services?.map(s => s.route) || [],
    onChange: (selected: string[], selectedItems: ISelectItem[]) =>
      setInput(prev => {
        const input = { ...prev };
        input.services = selectedItems;
        if (onChange && input.expectedDeliveryDate && input.pregnancyLatLong) {
          onChange(input as ISearchMidwifeInput);
        }
        return input;
      }),
  };

  const onFilter = (
    selectedLanguages: ILanguage[],
    selectedServices: IService[]
  ) => {
    setInput(prev => {
      const input = { ...prev };
      input.languages = selectedLanguages;
      input.services = selectedServices;
      if (onChange) onChange(input as ISearchMidwifeInput);
      return input;
    });
  };

  const handleRemoveAllFilters = () =>
    setInput(prev => {
      const input = { ...prev };
      input.languages = [];
      input.services = [];
      if (onChange) onChange(input as ISearchMidwifeInput);
      return input;
    });

  const handleInputChange = (params: ISearchMidwifeWidgetInput) => {
    setInput(prev => {
      const input = { ...prev };
      input.expectedDeliveryDate = params.deliveryDate;
      input.pregnancyLatLong = params.pregnancyLatLong;
      input.careTypes = params.careTypes;
      input.pregnancyPlz = params.postalCode;

      if (onChange) {
        onChange(input as ISearchMidwifeInput);
      }
      return input;
    });
  };

  const getDescriptionText = (count?: number) =>
    rawDescriptionText?.replace(
      "[SEARCH_RESULT_COUNT]",
      `<strong>${(count || 0).toString()}</strong>`
    );
  const [descriptionText, setDescriptionText] = useState(
    getDescriptionText(resultsCount)
  );
  useEffect(() => {
    setDescriptionText(getDescriptionText(resultsCount));
  }, [resultsCount]);

  useEffect(() => {
    setHasFilter(!!(input.languages.length + input.services.length));
  }, [input.languages, input.services]);
  useEffect(() => {
    setCallSearchOnLoad(isPageLoad && !!plz);
  }, [isPageLoad, plz]);

  return {
    expectedDeliveryDate:
      input.expectedDeliveryDate instanceof Date &&
      !isNaN(input.expectedDeliveryDate as any)
        ? input.expectedDeliveryDate
        : initialExpectedDeliveryDate,
    postalCode: plz,
    careTypeSelectState,
    languageSelectState,
    serviceSelectState,
    descriptionText,
    hasFilter,
    callSearchOnLoad,
    onFilter,
    handleInputChange,
    handleRemoveAllFilters,
  };
};
