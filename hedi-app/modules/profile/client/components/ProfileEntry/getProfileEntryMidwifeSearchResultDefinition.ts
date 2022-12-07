import { IComponent, getLabelInstance } from "@/modules/components/types";
import { IProfileEntryMidwifeSearchResultDefinition } from "@/modules/profile/types";

export const getProfileEntryMidwifeSearchResultDefinition = (
  components: IComponent[]
): IProfileEntryMidwifeSearchResultDefinition => {
  return {
    matchingCareTypesLabel: getLabelInstance(
      components,
      "matchingCareTypesLabel",
      { labelKind: "h5", text: "Betreuungsart" }
    ),
    matchingLanguagesLabel: getLabelInstance(
      components,
      "matchingLanguagesLabel",
      { labelKind: "h5", text: "Sprache" }
    ),
    matchingServicesLabel: getLabelInstance(
      components,
      "matchingServicesLabel",
      { labelKind: "h5", text: "Leistungen" }
    ),

    showMoreLabel: getLabelInstance(components, "showMoreLabel", {
      labelKind: "span",
      text: "mehr anzeigen",
    }),

    showLessLabel: getLabelInstance(components, "showLessLabel", {
      labelKind: "span",
      text: "weniger anzeigen",
    }),
  };
};
