import { IComponent, getLabelInstance } from "@/modules/components/types";
import { getRelatedProfileDefinition } from "./RelatedProfile/getRelatedProfileDefinition";
import { IRelatedProfilesDefinition } from "./RelatedProfiles";
import { getZipCodeDefinition } from "./ZipCode/getZipCodeDefinition";

export const getRelatedProfilesDefinition = (
  components: IComponent[]
): IRelatedProfilesDefinition => {
  const relatedProfilesDefinition = getLabelInstance(
    components,
    "relatedProfilesHeadline",
    { labelKind: "span", text: "Verknüpfte Profile" }
  );

  const profileEntryDefinition = getRelatedProfileDefinition(components);
  const zipCodeDefinition = getZipCodeDefinition(components);
  return {
    relatedProfilesHeadline: relatedProfilesDefinition.text,
    zipCodeDefinition: zipCodeDefinition,
    profileEntryDefinition: profileEntryDefinition,
  } as IRelatedProfilesDefinition;
};
