import { useEffect, useState } from "react";
import { logAndNull } from "@/modules/common/error";
import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { CareType } from "@/modules/networking/types/ICareType";
import {
  ICareTypeDateRange,
  IProfileSearchResponse,
  ISearchInputParams,
  ISearchMidwifeInput as ISearchMidwifeRequest,
  ISearchMidwifeScoreMultiplier,
  RankedScoredIProfile,
  searchMidwifeAPIUrl,
} from "../../../types";
import { ISearchMidwifeInput } from "./types";
import { IWizard, IWizardData } from "@/modules/common/types";
import { useUser } from "@/modules/auth/client/hooks";
import useSWR from "swr";
import {
  IMidwifeCareConnection,
  myMidwifeCareConnectionsAPIUrl,
} from "@/modules/networking/types";
import { requestMyMidwifeCareConnections } from "@/modules/networking/client/request/requestMyMidwifeCareConnections";

export const useSearchMidwifeView = (lang = "de", wizard?: IWizard) => {
  const [user] = useUser();
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
  const [isMidwifeUser, setIsMidwifeUser] = useState(false);
  useEffect(() => {
    setIsMidwifeUser(user?.role === "midwife");
  }, [user]);
  const [searchInput, setSearchInput] = useState<ISearchMidwifeInput | null>(
    null
  );
  const [scoreMultipliers, setScoreMultipliers] = useState<
    ISearchMidwifeScoreMultiplier | undefined
  >({
    availability: 0.33,
    distance: 0.25,
    languages: 0.5,
    services: 0.75,
    careTypes: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [isPageLoad, setIsPageLoad] = useState(true);
  const [profileResults, setProfileResults] = useState<
    RankedScoredIProfile[] | null
  >();
  const [languageCounts, setLanguageCounts] = useState<Record<string, number>>(
    {}
  );
  const [serviceCounts, setServiceCounts] = useState<Record<string, number>>(
    {}
  );

  const handleScoreMultiplierChange = (
    multipiers: ISearchMidwifeScoreMultiplier
  ) => {
    setScoreMultipliers(multipiers);
    if (searchInput) requestSearch(searchInput);
  };

  const handleSearchInputChange = (input: ISearchMidwifeInput) => {
    setIsPageLoad(false);
    setSearchInput(input);
    requestSearch(input);
  };

  const requestSearch = (input: ISearchMidwifeInput) => {
    setIsLoading(true);
    jsonPost<IAPIResponse<IProfileSearchResponse>>(
      searchMidwifeAPIUrl,
      toRequestObject(input, lang, scoreMultipliers)
    )
      .then(resp => logAndNull(resp))
      .then(resp => {
        setIsLoading(false);
        if (resp) {
          setLanguageCounts(resp.data?.languagesCounts ?? {});
          setServiceCounts(resp.data?.servicesCounts ?? {});
          setProfileResults(resp.data?.result);
          setResultsCount(resp.data?.result?.length || 0);

          if (wizard) {
            const output: ISearchInputParams = {
              plz: input.pregnancyPlz,
              latlon: input.pregnancyLatLong,
              date: input.expectedDeliveryDate?.getTime() + "" || "",
              cares: input.careTypes.map(caretype => caretype.route) || [],
            };
            const data: IWizardData<ISearchInputParams> = {
              key: "searchParams",
              value: output,
            };
            wizard?.upsertWizardData(data, true);
          }
        }
      });
  };
  const queryCareTypes = searchInput?.careTypes ?? [];
  const searchResults = profileResults
    ? {
        profileResults,
        queryCareTypes: searchInput?.careTypes ?? [],
        queryLanguages: searchInput?.languages ?? [],
        queryServices: searchInput?.services ?? [],
      }
    : null;
  return {
    isMidwifeUser,
    searchResults,
    languageCounts,
    isLoading,
    serviceCounts,
    isPageLoad,
    resultsCount,
    careConnections,
    queryCareTypes,
    handleSearchInputChange,
    handleScoreMultiplierChange,
  };
};

function toRequestObject(
  searchInput: ISearchMidwifeInput,
  lang = "de",
  scoreMultipliers?: ISearchMidwifeScoreMultiplier
): ISearchMidwifeRequest {
  const {
    expectedDeliveryDate,
    pregnancyLatLong,
    careTypes,
    languages,
    services,
  } = searchInput;
  return {
    lang,
    locationData: {
      latLong: pregnancyLatLong,
    },
    careTypeDateRanges: toCareTypeDateRanges(
      expectedDeliveryDate,
      careTypes.map(ct => ct.route)
    ),
    languages: languages.map(l => l.route),
    services: services.map(s => s.route),
    scoreMultipliers,
  };
}

function toCareTypeDateRanges(
  expectedDeliveryDate: Date,
  careTypes: CareType[]
): ICareTypeDateRange[] {
  const result = [] as ICareTypeDateRange[];
  if (!expectedDeliveryDate) return result;
  if (careTypes.find(ct => !!ct.match(/prenatalCare/i))) {
    result.push({
      careType: "prenatalCare",
      fromDate: addMonths(expectedDeliveryDate, -6),
      toDate: expectedDeliveryDate,
    });
  }
  if (careTypes.find(ct => !!ct.match(/deliveryCare/i))) {
    result.push({
      careType: "deliveryCare",
      fromDate: addDays(expectedDeliveryDate, -14),
      toDate: addDays(expectedDeliveryDate, 14),
    });
  }
  if (careTypes.find(ct => !!ct.match(/postpartumCare/i))) {
    result.push({
      careType: "postpartumCare",
      fromDate: expectedDeliveryDate,
      toDate: addDays(expectedDeliveryDate, 30),
    });
  }
  return result;
}

const addMonths = (date: Date, months: number) =>
  new Date(new Date(date).setMonth(date.getMonth() + months));
const addDays = (date: Date, days: number) =>
  new Date(new Date(date).setDate(date.getDate() + days));
