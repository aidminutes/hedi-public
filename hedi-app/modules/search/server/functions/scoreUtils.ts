import { IGroupedFields } from "../solr";
import { IScoreItem, ISearchResultStats, IWithScoreDetails } from "../../types";

const getFieldnameFromDescription = (description: string): string | null => {
  // sample description: "weight(tm_X3b_de_service_name:frau in 17) [SchemaSimilarity], result of:"
  const match = /weight\((.+?)(?=:)/g.exec(description);
  if (match && match[1]) return match[1];
  // another description: "itm_profile__services__tid:[716 TO 716]"
  const matchRange = /^(.+?)(?=:\[):\[(.+)(?= TO).*]$/g.exec(description);
  if (matchRange && matchRange[1]) return matchRange[1];
  // location description: "locm_address_lat_long:INTERSECTS:geometries([CIRCLE([51.7068,10.00679] radius = 5000.0 meters)])"
  const locationMatch = /(.+?)(?=:INTERSECTS:geometries)/g.exec(description);
  if (locationMatch && locationMatch[1]) return locationMatch[1];
  return null;
};

const getValueFromDescription = (description: string): string | null => {
  // sample description: "weight(tm_X3b_de_service_name:frau in 17) [SchemaSimilarity], result of:"
  const match = /weight\((.+?)(?=:):(.+?)(?= in)/g.exec(description);
  if (match && match[2]) return match[2];
  // another description: "itm_profile__services__tid:[716 TO 716]"
  const matchRange = /^(.+?)(?=:\[):\[(.+)(?= TO).*]$/g.exec(description);
  if (matchRange && matchRange[2]) return matchRange[2];
  return null;
};

export const addScoreToResultItems = (
  docs: any[],
  debugInfo: any,
  groupedFields: IGroupedFields[],
  filtersCount: { [key: string]: number }
): IWithScoreDetails[] => {
  if (!debugInfo || !debugInfo.explain) return docs;
  /* sample explain item: 
  {
    "match":true,
    "value":3.394205,
    "description":"sum of:",
    "details":[{
        "match":true,
        "value":0.61583126,
        "description":"weight(tm_X3b_de_service_name:frau in 17) [SchemaSimilarity], result of:",
        "details": [...]
      {
        "match":true,
        "value":2.7783737,
        "description":"weight(fuzzy_label:nico in 17) [SchemaSimilarity], result of:",
        "details":[...]}
      ]
    }
  */
  docs.forEach(resultItem => {
    const scoreDetails = debugInfo.explain[resultItem.id];
    if (
      !scoreDetails ||
      !Array.isArray(scoreDetails.details) ||
      !scoreDetails.details.length
    )
      return;
    const scores: { [key: string]: IScoreItem } = {};
    const matchedFieldValues: { [key: string]: string[] } = {};
    groupedFields.forEach(group => {
      scores[group.name] = { score: 0, total: filtersCount[group.name] || 0 };
    });
    const allScoreDetails = getAllScoreDetails(scoreDetails);
    allScoreDetails.forEach((scoreDetailItem: any) => {
      if (!scoreDetailItem) return;
      const fieldname = getFieldnameFromDescription(
        scoreDetailItem.description
      );
      if (!fieldname) return;
      const groupName =
        groupedFields
          .filter(
            group =>
              group.fields.findIndex(field =>
                new RegExp("^" + field.replace("{lang}", ".+") + "$").test(
                  fieldname
                )
              ) != -1
          )
          .map(group => group.name)[0] ?? fieldname;
      const itemScore =
        groupName == "location"
          ? getDistanceScore(resultItem.geoDistance)
          : scoreDetailItem.value;
      if (scores[groupName]) scores[groupName].score += itemScore;
      else scores[groupName] = { score: itemScore, total: 1 };

      if (!matchedFieldValues[fieldname]) {
        matchedFieldValues[fieldname] = [];
      }
      matchedFieldValues[fieldname].push(
        getValueFromDescription(scoreDetailItem.description) || ""
      );
    });
    if (!scores.location) {
      scores.location = {
        score: getDistanceScore(resultItem.geoDistance),
        total: 1,
      };
    }
    resultItem.scoreDetails = scores;
    resultItem.scoreDetailMatchedFieldValues = matchedFieldValues;
  });
  return docs;
};

export const getHitsCount = (
  docs: any[],
  debugInfo: any,
  groupedFields: IGroupedFields[],
  groupedValues: Record<string, string | string[]>
): ISearchResultStats[] => {
  const hitCounts: ISearchResultStats[] = [];
  Object.keys(groupedValues).forEach(groupName => {
    const values = groupedValues[groupName];
    const hits: Record<string, number> = {};
    ((Array.isArray(values) ? values.join(" ") : values) || "")
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .forEach(word => {
        hits[word] = 0;
      });
    hitCounts.push({
      type: groupName,
      hits: hits,
    });
  });

  docs.forEach(resultItem => {
    const scoreDetails = debugInfo.explain[resultItem.id];
    if (
      !scoreDetails ||
      !Array.isArray(scoreDetails.details) ||
      !scoreDetails.details.length
    )
      return;
    const scores: { [key: string]: number } = {};
    groupedFields.forEach(group => {
      scores[group.name] = 0;
    });
    const allScoreDetails = getAllScoreDetails(scoreDetails);
    allScoreDetails.forEach((scoreDetailItem: any) => {
      if (!scoreDetailItem) return;
      const searchedValue = getValueFromDescription(
        scoreDetailItem.description
      );
      const fieldname = getFieldnameFromDescription(
        scoreDetailItem.description
      );
      if (!fieldname || !searchedValue) return;
      const groupName =
        groupedFields
          .filter(
            group =>
              group.fields.findIndex(field =>
                new RegExp("^" + field.replace("{lang}", ".+") + "$").test(
                  fieldname
                )
              ) != -1
          )
          .map(group => group.name)[0] ?? fieldname;
      let hitCountItem = hitCounts.find(item => item.type == groupName);
      if (!hitCountItem) {
        hitCountItem = { type: groupName, hits: {} };
        hitCounts.push(hitCountItem);
      }
      hitCountItem.hits[searchedValue] =
        (hitCountItem.hits[searchedValue] || 0) + 1;
    });
  });
  return hitCounts;
};

const getDistanceScore = (
  distance: number | "Infinity" | undefined,
  minimumKm = 0.5,
  gamma = 2
) => {
  if (distance == "Infinity" || distance == undefined) return 0;

  if (distance <= minimumKm) return 1;

  // NOTE applying an inverse logarithmic curve on distance
  // 'minimumMeter': highcut filter, all distance below minimum will result in 1
  // 'gamma' changes the easing = bias towards 0 and 1 respectively
  const clampedMeter = Math.max(0, distance - minimumKm); // everything below minimumMeter => 1
  // constant '10' due to log10
  const score = Math.pow(1 / Math.log10(10 + clampedMeter), gamma);
  return Math.max(0, Math.min(1, score));
};

function getAllScoreDetails(scoreDetails: any): any[] {
  if (!scoreDetails) return [];
  return [scoreDetails].concat(
    ...((scoreDetails.details as []) ?? []).flatMap(detailsItem =>
      getAllScoreDetails(detailsItem)
    )
  );
}
