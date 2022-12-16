import { IErrorResponse, IsIHTTPError } from "@/modules/common/error";
import { transformLatLngToCoordinateString } from "@/modules/map/server/functions";
import { requestCoordinates } from "@/modules/map/server/request";
import { searchProfileServer } from "../request";
import { NextApiHandler } from "next";
import { sendAPIHttpError, sendAPISuccess } from "@/modules/common/utils";
import {
  ISearchProfileInput,
  IProfileSearchResponse,
  RankedScoredIProfile,
  IProcessedLocationData,
} from "../../types";
import { getProfilePublicDetails } from "@/modules/profile/server";
import { IAPIResponse } from "@/modules/model";

export const solrSearchProfileAPI: NextApiHandler<
  IErrorResponse | IProfileSearchResponse
> = async (req, res) => {
  const searchParams = (req.body
    ? JSON.parse(req.body)
    : {}) as ISearchProfileInput;

  await processLocation(searchParams);
  const data = await searchProfileServer(searchParams);

  if (IsIHTTPError(data)) sendAPIHttpError(res, data);
  else {
    const solrResultItems = data.result.filter(entry => entry.route);
    const entries = await getProfilePublicDetails(
      searchParams.lang,
      solrResultItems.map(entry => entry.route)
    ).then(profiles =>
      (profiles || []).map((profile, index) => {
        if (!profile) return null;
        const profileData = solrResultItems[index];
        if (!profileData) return null;
        return {
          scoreDetails: profileData.scoreDetails,
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
        stats: [], // TODO return stats like searchMidwife
      } as IProfileSearchResponse,
    } as IAPIResponse<IProfileSearchResponse>);
  }
};

const processLocation = async (searchParams: ISearchProfileInput) => {
  if (searchParams.locationData?.location) {
    const splittedLocation = searchParams.locationData.location.split(",");
    const isLatLon =
      splittedLocation.length == 2 &&
      splittedLocation.filter(part => !isNaN(parseFloat(part))).length == 2;
    if (isLatLon)
      (searchParams.locationData as IProcessedLocationData).latLong =
        searchParams.locationData.location;
    else {
      const locationJson = await requestCoordinates(
        searchParams.locationData.location
      );
      const locationCoordinates = transformLatLngToCoordinateString(
        locationJson
      );
      (searchParams.locationData as IProcessedLocationData).latLong = locationCoordinates;
    }
  }
};

export default solrSearchProfileAPI;
