import { geoDistance, parseLatLong } from "@/modules/common/utils";
import { ITag } from "@/modules/model";
import { Location } from "@/modules/map/types";
import { IBusinessProfile, IWithDistanceAndServiceCount } from "../../../types";

type RelatedBusinessProfile = IBusinessProfile & IWithDistanceAndServiceCount;

export function filterRelatedProfiles(
  userLocation: Location | null,
  profileEntries: IBusinessProfile[],
  articleTags: ITag[]
) {
  const articleTagValues = articleTags.map(tag => tag.label);
  const profileLinks = profileEntries.map((profile, index) => {
    const profileLink: RelatedBusinessProfile = {
      ...profile,
      distance: "9999",
      serviceCount: 0,
    };
    profileLink.services =
      profileLink.services?.filter(service => {
        return articleTagValues.includes(service.label);
      }) ?? [];
    profileLink.services.map(service => {
      articleTagValues.find(x =>
        x === service.label
          ? profileLink.serviceCount++
          : profileLink.serviceCount
      );
    });
    const profileAddresses = profileLink.addresses;
    profileLink.distance =
      userLocation &&
      userLocation.latLong &&
      profileAddresses &&
      profileAddresses.length
        ? geoDistance(
            userLocation?.latLong,
            parseLatLong(
              profileAddresses[0]?.latLong ||
                profileAddresses[0]?.latLongApprox ||
                ""
            )
          )
        : "9999"; //when there is no profile adress give those the least benefit and show them at end
    return profileLink;
  });
  //sort based on distance and the services count
  profileLinks.sort(
    (a: RelatedBusinessProfile, b: RelatedBusinessProfile) =>
      a.distance.localeCompare(b.distance, "de", { numeric: true }) ||
      a.serviceCount
        .toString()
        .localeCompare(b.serviceCount.toString(), "de", { numeric: true })
  );

  return profileLinks;
}
