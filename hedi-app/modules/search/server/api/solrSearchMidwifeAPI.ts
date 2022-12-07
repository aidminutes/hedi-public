import { IErrorResponse, IsIHTTPError } from "@/modules/common/error";
import { searchMidwifeServer } from "../request";
import { NextApiHandler } from "next";
import {
  sendAPIErrorIfUnauthorized,
  sendAPIHttpError,
  sendAPISuccess,
} from "@/modules/common/utils";
import {
  ISearchMidwifeInput,
  IProfileSearchResponse,
  RankedScoredIProfile,
} from "../../types";
import { getProfilePublicDetails } from "@/modules/profile/server";
import { getUserAuthHeader } from "@/modules/auth/server";
import { getSearchConfigFieldsByGroupName } from "../solr";
import { searchConfigs } from "../solr/searchConfigs";
import { IAPIResponse } from "@/modules/model";

export const solrSearchMidwifeAPI: NextApiHandler<
  IErrorResponse | IProfileSearchResponse
> = async (req, res) => {
  const searchParams = (req.body
    ? JSON.parse(req.body)
    : {}) as ISearchMidwifeInput;

  const data = await searchMidwifeServer(searchParams);

  if (IsIHTTPError(data)) sendAPIHttpError(res, data);
  else {
    const solrResultItems = data.result.filter(entry => entry.route);
    const { languagesCounts, servicesCounts } = getLanguageAndServicesCounts(
      solrResultItems,
      searchParams.lang
    ); // TODO move to searchMidwifeUtils.ts file after merge

    const entries = await getProfilePublicDetails(
      searchParams.lang,
      solrResultItems.map(entry => entry.route)
    ).then(profiles =>
      profiles.map((profile, index) => {
        if (!profile) return null;
        const profileData = solrResultItems[index];
        if (!profileData) return null;
        return {
          scoreDetails: profileData.scoreDetails,
          geoDistance: profileData.geoDistance,
          geoDistanceText: profileData.geoDistanceText,
          matchedCareTypes: profileData.matchedCareTypes,
          ...profile,
        };
      })
    );

    //@ts-expect-error TODO fix typing
    const nonNull = entries.filter(entry => entry) as RankedScoredIProfile[];
    sendAPISuccess(res, {
      success: true,
      data: {
        result: nonNull,
        count: nonNull.length,
        stats: data.stats,
        servicesCounts,
        languagesCounts,
      } as IProfileSearchResponse,
    } as IAPIResponse<IProfileSearchResponse>);
  }
};

export default solrSearchMidwifeAPI;

type CountsResult = Pick<
  IProfileSearchResponse,
  "languagesCounts" | "servicesCounts"
>;

const getLanguageAndServicesCounts = (
  solrResultItems: any[],
  lang: string
): CountsResult => {
  const counts: CountsResult = { languagesCounts: {}, servicesCounts: {} };
  const servicesFieldname = getSearchConfigFieldsByGroupName(
    searchConfigs.searchMidwife.groupedFields,
    "services",
    lang
  )[0];
  const languagesFieldname = getSearchConfigFieldsByGroupName(
    searchConfigs.searchMidwife.groupedFields,
    "languages",
    lang
  )[0];
  solrResultItems.forEach(profileItem => {
    if (profileItem[languagesFieldname]) {
      profileItem[languagesFieldname].forEach((langValue: string) => {
        if (counts.languagesCounts)
          if (!counts.languagesCounts[langValue])
            counts.languagesCounts[langValue] = 1;
          else counts.languagesCounts[langValue]++;
      });
    }
    if (profileItem[servicesFieldname] && counts.servicesCounts) {
      profileItem[servicesFieldname].forEach((serviceValue: string) => {
        if (counts.servicesCounts)
          if (!counts.servicesCounts[serviceValue])
            counts.servicesCounts[serviceValue] = 1;
          else counts.servicesCounts[serviceValue]++;
      });
    }
  });
  return counts;
};
