import { responseToIHTTPError, IHTTPError } from "@/modules/common/error";
import {
  ICareTypeDateRange,
  IScoreItem,
  ISearchMidwifeInput,
  ISearchMidwifeScoreMultiplier,
  IProfileSearchResponse,
  IWithScoreDetails,
} from "../../types";
import {
  addScoreToResultItems,
  applyMidwifeRequestPreferencesToSearchResult,
  getHitsCount,
  transformCareTypeToRoute,
  transformParamsToSolrRequestStringForSearchMidwife,
} from "../functions";
import { searchConfigs, solrInternalDocIdField } from "../solr";
import { requestFromSolr } from "./requestFromSolr";

export async function searchMidwifeServer(
  searchParams: ISearchMidwifeInput
): Promise<IProfileSearchResponse | IHTTPError> {
  const reqBody = transformParamsToSolrRequestStringForSearchMidwife(
    searchParams
  );
  const response = await requestFromSolr("/select", reqBody);

  if (response.status !== 200) return responseToIHTTPError(response);
  const jsonResponse = await response.json();

  let content = jsonResponse.response.docs;
  fixGeoDistances(content);
  content = applyMidwifeRequestPreferencesToSearchResult(
    content,
    searchParams.lang
  );

  const hitCounts = getHitsCount(
    content,
    jsonResponse.debug,
    searchConfigs.searchMidwife.groupedFields,
    {
      services: searchParams.services,
      careTypes: searchParams.careTypeDateRanges.map(careTypeDateRange =>
        transformCareTypeToRoute(careTypeDateRange.careType)
      ),
      languages: searchParams.languages,
    }
  );

  if (!content?.length) return { result: [], count: 0, stats: hitCounts };
  const filtersCount = {
    services: (searchParams.services || []).length,
    careTypes: (searchParams.careTypeDateRanges || []).length,
    languages: (searchParams.languages || []).length,
    location: 1,
  };

  content = addScoreToResultItems(
    content,
    jsonResponse.debug,
    searchConfigs.searchMidwife.groupedFields,
    filtersCount
  );

  content = addAvailabilityScoreAndProvidedCareTypesToResultItems(
    content,
    searchParams.careTypeDateRanges
  );

  content = normalizeScoresAndApplyMultipliers(
    content,
    searchParams.careTypeDateRanges,
    searchParams.scoreMultipliers
  );

  content = addRankToResultItems(content);

  if (Array.isArray(content))
    content.forEach(entry => {
      let [_, route, _2] = entry[solrInternalDocIdField].split(":");
      entry.route = "/" + route;
    });
  return { result: content, count: content.length, stats: hitCounts };
}

const addAvailabilityScoreAndProvidedCareTypesToResultItems = (
  docs: any[],
  careTypeDateRanges: ICareTypeDateRange[]
) => {
  const careTypesFieldName = searchConfigs.searchMidwife.groupedFields.find(
    group => group.name == "careTypes"
  )?.fields[0];

  docs.forEach(entry => {
    if (!entry.scoreDetails) {
      entry.scoreDetails = {};
    }
    const matchedCareTypes: string[] = [];
    careTypeDateRanges.forEach(careTypeDateRange => {
      const matchedCareTypeRoute =
        careTypesFieldName &&
        entry.scoreDetailMatchedFieldValues &&
        entry.scoreDetailMatchedFieldValues[careTypesFieldName] &&
        Array.isArray(entry.scoreDetailMatchedFieldValues[careTypesFieldName])
          ? entry.scoreDetailMatchedFieldValues[
              careTypesFieldName
            ].find((careTypeRoute: string) =>
              careTypeRoute.endsWith(careTypeDateRange.careType.toLowerCase())
            )
          : null;
      if (matchedCareTypeRoute) {
        entry.scoreDetails[careTypeDateRange.careType + "Availability"] = {
          score:
            1 -
            ((entry as any)[careTypeDateRange.careType + "IntersectRatio"] ||
              0),
          total: 1,
        };
        matchedCareTypes.push(matchedCareTypeRoute);
      } else {
        entry.scoreDetails[careTypeDateRange.careType + "Availability"] = {
          score: 0,
          total: 1,
        };
      }
    });
    entry.matchedCareTypes = matchedCareTypes;
  });
  return docs;
};

const addRankToResultItems = (docs: any[]) => {
  const sumScores = (scoreDetails: Record<string, IScoreItem>) => {
    let score = 0;
    Object.keys(scoreDetails).forEach(param => {
      score += scoreDetails[param].score || 0;
    });
    return score;
  };

  docs
    .sort((a, b) => sumScores(b.scoreDetails) - sumScores(a.scoreDetails))
    .forEach((doc, index) => {
      doc.rank = index + 1;
    });

  return docs;
};

const normalizeScoresAndApplyMultipliers = (
  docs: IWithScoreDetails[],
  careTypes: ICareTypeDateRange[],
  scoreMultipliers?: ISearchMidwifeScoreMultiplier
) => {
  docs.forEach(docItem => {
    const scoreDetails = docItem.scoreDetails;
    if (!scoreDetails) return;

    if (scoreDetails.careTypes && scoreDetails.careTypes.total) {
      scoreDetails.careTypes.score =
        (scoreDetails.careTypes.score / ((careTypes || []).length || 1)) *
        (scoreMultipliers?.careTypes ?? 1);
      scoreDetails.careTypes.total *= scoreMultipliers?.careTypes ?? 1;
    }
    if (scoreDetails.services && scoreDetails.services.total) {
      scoreDetails.services.score =
        (scoreDetails.services.score / scoreDetails.services.total) *
        (scoreMultipliers?.services ?? 1);
      scoreDetails.services.total *= scoreMultipliers?.services ?? 1;
    }
    if (scoreDetails.location && scoreDetails.location.total) {
      scoreDetails.location.score =
        (scoreDetails.location.score / scoreDetails.location.total) *
        (scoreMultipliers?.distance ?? 1);
      scoreDetails.location.total *= scoreMultipliers?.distance ?? 1;
    }
    if (scoreDetails.languages && scoreDetails.languages.total) {
      scoreDetails.languages.score =
        (scoreDetails.languages.score / scoreDetails.languages.total) *
        (scoreMultipliers?.languages ?? 1);
      scoreDetails.languages.total *= scoreMultipliers?.languages ?? 1;
    }
    Object.keys(scoreDetails)
      .filter(prop => prop.endsWith("Availability"))
      .forEach(availabilityProp => {
        scoreDetails[availabilityProp].score *=
          scoreMultipliers?.availability ?? 1;
        scoreDetails[availabilityProp].total *=
          scoreMultipliers?.availability ?? 1;
      });
  });
  return docs;
};

export const fixGeoDistances = (
  docs: {
    geoDistance?: number | "Infinity";
    geoDistanceApprox?: number | "Infinity";
  }[]
) => {
  docs.forEach(entity => {
    if (entity.geoDistance == "Infinity") entity.geoDistance = undefined;
    if (entity.geoDistanceApprox == "Infinity")
      entity.geoDistanceApprox = undefined;
    if (entity.geoDistanceApprox && !entity.geoDistance)
      entity.geoDistance = entity.geoDistanceApprox;
    delete entity.geoDistanceApprox;
  });
};
