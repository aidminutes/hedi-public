import {
  getButtonInstance,
  getGroupInstance,
  getLabelInstance,
  getSelectInstance,
  IComponent,
} from "@/modules/components";
import { getServicesWithChildren } from "@/modules/profile/types/taxonomyTypes/IService";

export const getServicesAndLanguagesFilterDefinition = (
  components: IComponent[]
) => {
  const allServices = getServicesWithChildren(
    getGroupInstance(components, "serviceSelect", {
      usage: "",
      components: [],
    })
  );
  return {
    allServices,
    allLanguagesSelect: getSelectInstance(components, "languageSelect", {
      labelText: "Sprache",
      items: [],
    }),
    servicesLabel: getLabelInstance(components, "servicesLabel", {
      labelKind: "label",
      text: "Leistungen",
    }),
    useFilterButton: getButtonInstance(components, "useFilterButton", {
      usage: "",
      buttonKind: "primary",
      labelText: "Filter anwenden",
    }),
    filterResetButton: getButtonInstance(components, "filterResetButton", {
      usage: "",
      buttonKind: "ghost",
      labelText: "Abbrechen",
    }),
    filterButton: getButtonInstance(components, "filterButton", {
      usage: "",
      buttonKind: "primary",
      labelText: "Sprachen und Leistungen",
    }),
    filterLabel: getLabelInstance(components, "filterLabel", {
      labelKind: "label",
      text: "Filter",
    }),
    filterDescriptionLabel: getLabelInstance(
      components,
      "filterDescriptionLabel",
      {
        labelKind: "paragraph",
        text:
          "Wähle aus den Sprachen und Leistungen, die von den gefundenen Professionals angeboten werden.",
      }
    ),
    languagesLabel: getLabelInstance(components, "languagesLabel", {
      labelKind: "label",
      text: "Sprachen",
    }),
    clearSelectionDescriptionLabel: getLabelInstance(
      components,
      "clearSelectionDescriptionLabel",
      {
        labelKind: "label",
        text: "Ausgewählte löschen",
      }
    ),
  };
};
