import { IScoreItem } from "@/modules/search/types/IScoreItem";
import { IBusinessProfile } from "@/modules/profile/types";
import { ISearchResponse, IWithResultStats } from ".";

export interface IWithScoreDetails {
  scoreDetailMatchedFieldValues: { [key: string]: string[] };
  scoreDetails: { [key: string]: IScoreItem };
}

export type ScoredIProfile = IBusinessProfile & IWithScoreDetails;
export type RankedScoredIProfile = ScoredIProfile & {
  rank: number;
  geoDistance?: number;
  geoDistanceText?: string;
  matchedCareTypes?: string[];
};

export interface IProfileSearchResponse
  extends ISearchResponse<RankedScoredIProfile>,
    IWithResultStats {
  languagesCounts?: Record<string, number>;
  servicesCounts?: Record<string, number>;
}
