import {
  getButtonInstance,
  getDatePickerInstance,
  getImageInstance,
  getLabelInstance,
  getTextInputInstance,
  IButtonComponent,
  IComponent,
  IDatePickerComponent,
  IImageComponent,
  ILabelComponent,
  ITextInputComponent,
} from "@/modules/components";
import { ICareTypeInputDefinition } from "../SearchMidwifeInput/CareTypeInput";
import { getCareTypeInputDefinition } from "../SearchMidwifeInput/CareTypeInput/getCareTypeInputDefinition";

export interface ISearchMidwifeWidgetDefinition {
  postalCodeTextInput: ITextInputComponent;
  expectedDeliveryDateDatePicker: IDatePickerComponent;
  careTypes: ICareTypeInputDefinition;
  searchButton: IButtonComponent;
  searchImage: IImageComponent;
  invalidPostalCodeLabel: ILabelComponent;
}

export function getSearchMidwifeWidgetDefinition(
  components: IComponent[]
): ISearchMidwifeWidgetDefinition {
  return {
    postalCodeTextInput: getTextInputInstance(
      components,
      "postalCodeTextInput",
      {
        type: "text",
        labelText: "Postleitzahl",
      }
    ),
    expectedDeliveryDateDatePicker: getDatePickerInstance(
      components,
      "expectedDeliveryDateDatePicker",
      {
        datePickerType: "single",
        dateFormat: "d.m.Y",
        labelText: "Geburtstermin",
      }
    ),
    careTypes: getCareTypeInputDefinition(components),
    searchButton: getButtonInstance(components, "searchButton", {
      buttonKind: "primary",
      usage: "search",
      labelText: "Suchen",
    }),
    searchImage: getImageInstance(components, "searchImage", {
      width: 250,
      height: 180,
      route: "",
      label: "",
    }),
    invalidPostalCodeLabel: getLabelInstance(
      components,
      "invalidPostalCodeLabel",
      {
        labelKind: "p",
        text: "ungültige Postleitzahl",
      }
    ),
  };
}
