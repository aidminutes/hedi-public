import {
  getBodyInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { ISearchMidwifeViewDefinition } from "./SearchMidwife";
import { getSearchMidwifeInputDefinition } from "./SearchMidwifeInput";
import { getSearchMidwifeResultsDefinition } from "../SearchMidwifeResults";
import { getSearchMidwifeNoResultsDefinition } from "./SearchMidwifeNoResults/getSearchMidwifeNoResultsDefinition";

export const getSearchMidwifeDefinition = (
  components: IComponent[]
): ISearchMidwifeViewDefinition => {
  return {
    headlineLabel: getLabelInstance(components, "headline", {
      labelKind: "h1",
      text: "Hebammensuche",
    }),
    introText: getBodyInstance(components, "introText", {}),
    inputDefinition: getSearchMidwifeInputDefinition(components),
    resultsDefinition: getSearchMidwifeResultsDefinition(components),
    midwifeSearchNoResultsDefinition: getSearchMidwifeNoResultsDefinition(
      components
    ),
  };
};
