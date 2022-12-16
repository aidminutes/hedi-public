import { ILanguage } from "@/modules/common/types";
import { IBusinessProfile, IService } from "@/modules/profile/types";
import { IMatchingElement } from "../../../types";
import { ICareType } from "@/modules/networking/types/ICareType";

// NOTE might be parsed from solr result
export function parseMatches<
  T extends Pick<
    IBusinessProfile,
    "languageLevels" | "services" | "label" | "route"
  >
>(
  profile: T,
  queryCareTypes?: Pick<ICareType, "route" | "label">[],
  allCareTypes?: Pick<ICareType, "route" | "label">[],
  queryLanguages?: Pick<ILanguage, "route" | "label">[],
  queryServices?: Pick<IService, "route" | "label">[]
) {
  let matchingCareTypes: IMatchingElement<string>[] =
    allCareTypes?.map(careType => {
      let foundInQuery = !!queryCareTypes?.find(
        ct => ct.route === careType.route
      );
      let foundInProfile = !!(profile as any).careTypes?.find(
        (ct: Pick<ICareType, "route" | "label">) => ct.route === careType.route
      );
      return {
        value: careType.label,
        matchStatus: foundInQuery && foundInProfile,
        foundInProfile,
      };
    }) ?? [];

  // It delivers the matched elements before not matched elements.
  let matchingLanguages: IMatchingElement<string>[] =
    queryLanguages
      ?.filter(
        ql =>
          !!profile.languageLevels?.find(ll => ll.language.route === ql.route)
      )
      ?.map(ql => {
        return { value: ql.label, matchStatus: true };
      }) ?? [];

  matchingLanguages = matchingLanguages.concat(
    profile.languageLevels
      ?.filter(
        pl => !!!queryLanguages?.find(ql => ql.route === pl.language.route)
      )
      ?.map(pl => {
        return { value: pl.language.label, matchStatus: false };
      }) ?? []
  );

  // It delivers the matched elements before not matched elements.
  let matchingServices: IMatchingElement<string>[] =
    queryServices
      ?.filter(qs => !!profile.services?.find(s => s.route === qs.route))
      ?.map(qs => {
        return { value: qs.label, matchStatus: true };
      }) ?? [];

  matchingServices = matchingServices.concat(
    profile.services
      ?.filter(s => !!!queryServices?.find(qs => qs.route === s.route))
      ?.map(s => {
        return { value: s.label, matchStatus: false };
      }) ?? []
  );

  return { ...profile, matchingCareTypes, matchingLanguages, matchingServices };
}
