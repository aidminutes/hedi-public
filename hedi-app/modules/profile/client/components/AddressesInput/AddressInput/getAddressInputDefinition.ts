import {
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IAddressInputProps } from "./AddressInput";

export const getAddressInputDefinition = (
  components: IComponent[]
): IAddressInputProps => ({
  addressLabel: getLabelInstance(components, "address", {
    labelKind: "span",
    text: "Adresse",
  }),
  dataKindSelect: getSelectInstance(components, "dataKindSelect", {
    items: [],
  }),
  cityTextInput: getTextInputInstance(components, "cityTextInput", {
    type: "text",
    labelText: "Ort",
  }),
  postalCodeTextInput: getTextInputInstance(components, "postalCodeTextInput", {
    type: "text",
    labelText: "Postleitzahl",
  }),
  dataVisibilitySelect: getSelectInstance(components, "dataVisibilitySelect", {
    items: [],
  }),
  streetTextInput: getTextInputInstance(components, "streetTextInput", {
    type: "text",
    labelText: "Strasse",
  })!,
  streetNumberTextInput: getTextInputInstance(
    components,
    "streetNumberTextInput",
    { type: "text", labelText: "Hausnummer" }
  ),
  additionalInfoTextInput: getTextInputInstance(
    components,
    "additionalInfoTextInput",
    { type: "text", labelText: "Adresszusatz" }
  ),
  detailsVisibilitySelect: getSelectInstance(
    components,
    "detailsVisibilitySelect",
    { items: [] }
  ),
});
