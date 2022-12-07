import { getButtonInstance, IComponent } from "@/modules/components";
import { ICheckboxButtonDefinition } from "./types";

// TODO add an id input, which gets prefixed to the 3 states, XXXCheckboxButtonSelect, XXXCheckboxButtonSelected
// without that, this function can only be used for one usecase
export const getCheckboxButtonDefinition = (
  components: IComponent[]
): ICheckboxButtonDefinition => ({
  selectButton: getButtonInstance(components, "checkboxButtonSelect", {
    text: "auswählen",
    usage: "",
    buttonKind: "tertiary",
  }),
  selectedButton: getButtonInstance(components, "checkboxButtonSelected", {
    text: "ausgewählt",
    usage: "",
    buttonKind: "primary",
  }),
  requestSentButton: getButtonInstance(
    components,
    "checkboxButtonRequestSent",
    {
      text: "Anfrage gesendet",
      usage: "",
      buttonKind: "primary",
    }
  ),
});
