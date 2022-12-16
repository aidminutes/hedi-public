import { IConnectionProfile } from "@/modules/networking/types/IConnectionProfile";
import { MidwifeCareRequestEntry } from "@/modules/networking/types/MidwifeCareRequestEntry";
import { IMatchingElement } from "@/modules/search/types/IMatchingElement";

interface IParsedConnectionMatches {
  matchingCareTypes: IMatchingElement<string>[];
  matchingLanguages: IMatchingElement<string>[];
  matchingServices: IMatchingElement<string>[];
}

let initial: IParsedConnectionMatches = {
  matchingCareTypes: [],
  matchingLanguages: [],
  matchingServices: [],
};

export function parseConnectionMatches(
  sender: MidwifeCareRequestEntry | undefined,
  recipient: IConnectionProfile | undefined
): IParsedConnectionMatches {
  if (sender === undefined || recipient === undefined) return initial;
  let matchingCareTypes: IMatchingElement<string>[] =
    sender.careTypes.map(ct => {
      let foundInProfile = !!recipient.careTypes?.find(
        rct => rct.route === ct.route
      );
      return {
        value: ct.label,
        foundInProfile,
        matchStatus: false,
      };
    }) ?? [];
  let matchingLanguages: IMatchingElement<string>[] =
    sender.languages.map(lang => {
      let foundInProfile = !!recipient.languageLevels?.find(
        ll => ll.language.route === lang.route
      );
      return {
        value: lang.label,
        foundInProfile,
        matchStatus: false,
      };
    }) ?? [];

  let matchingServices: IMatchingElement<string>[] = sender.services.map(s => {
    let foundInProfile = !!recipient.services?.find(
      service => service.route === s.route
    );
    return {
      value: s.label,
      foundInProfile,
      matchStatus: false,
    };
  });

  return { matchingCareTypes, matchingLanguages, matchingServices };
}
