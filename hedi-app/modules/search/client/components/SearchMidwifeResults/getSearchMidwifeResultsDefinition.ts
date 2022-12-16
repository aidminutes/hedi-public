import { getCheckboxButtonDefinition } from "@/modules/common/client/components/CheckboxButton/getCheckboxButtonDefinition";
import {
  getBodyInstance,
  getButtonInstance,
  getLabelInstance,
  getLinkInstance,
  IComponent,
} from "@/modules/components";
import { getProfileEntryMidwifeSearchResultDefinition } from "@/modules/profile/client/components";
import { ISearchMidwifeResultsDefinition } from "@/modules/search/types";
import { getSearchMidwifeNoResultsDefinition } from "../SearchMidwife/SearchMidwifeNoResults/getSearchMidwifeNoResultsDefinition";

export const getSearchMidwifeResultsDefinition = (
  components: IComponent[]
): ISearchMidwifeResultsDefinition => ({
  resultsUpdatingLabel: getLabelInstance(components, "resultsUpdatingLabel", {
    labelKind: "span",
    text: "Die Liste wird aktualisiert",
  }),
  midwifeSearchResultDefinition: getProfileEntryMidwifeSearchResultDefinition(
    components
  ),
  sendRequestButton: getButtonInstance(components, "sendRequestButton", {
    text: "Anfrage senden",
    buttonKind: "primary",
    usage: "",
  }),
  requestCheckboxButtonDefinition: getCheckboxButtonDefinition(components),
  careRequestLink: getLinkInstance(components, "careRequestLink", {
    href: "/de/konto/hebammenanfrage",
    labelText: "Hebammenanfrage",
  }),

  selectedMidwifesLabel: getLabelInstance(components, "selectedMidwifesLabel", {
    labelKind: "Paragraph",
    text: "Du hast ([SELECTED_MIDWIFES_COUNT]) Hebammen ausgewählt.",
  }),
  firstSelectionHintBody: getBodyInstance(
    components,
    "firstSelectionHintBody",
    {
      body:
        "<p>Du hast deine erste Hebamme ausgewählt. &#128077; Wähle weitere aus, um deine Anfrage an mehr als eine Hebamme zu senden.</p>",
    }
  ),
  midwifeSearchNoResultsDefinition: getSearchMidwifeNoResultsDefinition(
    components
  ),
  activeCareLabel: getLabelInstance(components, "activeCareLabel", {
    labelKind: "span",
    text: "betreut dich",
  }),
  whyMidwifeUserCouldNotSelectMidwivesTooltipBody: getBodyInstance(
    components,
    "whyMidwifeUserCouldNotSelectMidwivesTooltipBody",
    {
      body:
        "<p>Du benötigst einen Schwangeren-/Elternteil-Account, um eine Anfrage an Hebammen senden zu können.</p>",
    }
  ),
});
