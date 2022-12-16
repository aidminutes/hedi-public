import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IAddressesInputDefinition } from ".";
import { getAddressInputDefinition } from "./AddressInput";

export const getAddressesInputDefinition = (
  components: IComponent[]
): IAddressesInputDefinition => ({
  addressInputDefinition: getAddressInputDefinition(components),
  addressesLabel: getLabelInstance(components, "addressesLabel", {
    labelKind: "span",
    text: "Adressen",
  }),
  addButton: getButtonInstance(components, "addressAddButton", {
    buttonKind: "primary",
    usage: "",
    text: "Adresse Hinzufügen",
  }),
  removeButton: getButtonInstance(components, "addressRemoveButton", {
    buttonKind: "ghost",
    usage: "",
    text: "Adresse Entfernen",
  }),
});
