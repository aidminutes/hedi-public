import {
  IComponent,
  getSelectInstance,
  getLabelInstance,
  getButtonInstance,
  serviceGroupToSelect,
} from "@/modules/components";
import {
  getSearchMidwifeWidgetDefinition,
  ISearchMidwifeWidgetDefinition,
} from "../SearchMidwifeWidget";
import { getCareTypeInputDefinition } from "./CareTypeInput/getCareTypeInputDefinition";
import { ISearchMidwifeInputDefinition } from "./SearchMidwifeInput";

export const getSearchMidwifeInputDefinition = (
  components: IComponent[]
): ISearchMidwifeInputDefinition & ISearchMidwifeWidgetDefinition => {
  const careTypeInputDefinition = getCareTypeInputDefinition(components);
  return {
    careTypeSelect: careTypeInputDefinition.careTypeSelect,
    languageSelect: getSelectInstance(components, "languageSelect", {
      labelText: "Sprachen",
      items: [{ route: "de", label: "Deutsch" }],
    }),
    serviceSelect: serviceGroupToSelect(components, "serviceSelect"),
    resultHeadline: getLabelInstance(components, "resultHeadline", {
      labelKind: "H2",
      text: "Ergebnis für Hebammensuche",
    }),
    resultHeadlineDescriptionOneResult: getLabelInstance(
      components,
      "resultHeadlineDescriptionOneResult",
      {
        labelKind: "Paragraph",
        text:
          "Super! Eine Hebamme gefunden.",
      }
    ),
    resultHeadlineDescriptionMultipleResults: getLabelInstance(
      components,
      "resultHeadlineDescriptionMultipleResults",
      {
        labelKind: "Paragraph",
        text:
          "Super! [SEARCH_RESULT_COUNT] Hebammen gefunden. Nutze den Filter, um deine Suche zu verfeinern.",
      }
    ),
    removeAllFiltersButton: getButtonInstance(
      components,
      "removeAllFiltersButton",
      {
        buttonKind: "ghost",
        usage: "",
        text: "Alle Filter zurücksetzen",
      }
    ),

    ...getSearchMidwifeWidgetDefinition(components),
  };
};
