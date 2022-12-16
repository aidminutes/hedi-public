import {
  getBodyInstance,
  getButtonInstance,
  getDatePickerInstance,
  getImageInstance,
  getLabelInstance,
  getLinkInstance,
  getSelectInstance,
  getTextInputInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IDatePickerComponent,
  IImageComponent,
  ILabelComponent,
  ILinkComponent,
  ISelectComponent,
  ITextInputComponent,
} from "@/modules/components";

export interface ISearchMidwifeEntryDefinition {
  headline: ILabelComponent;
  introText: IBodyComponent;
  postalCode: ITextInputComponent;
  birthdate: IDatePickerComponent;
  careTypes: ISelectComponent;
  invalidPostalCodeLabel: ILabelComponent;
  cancelButton: IButtonComponent;
  startSearchButton: IButtonComponent;
  footerText: IBodyComponent;
  footerImage: IImageComponent;
  toolTipBody: IBodyComponent;
  searchMidwifeLink: ILinkComponent;
  toolTipLink: ILinkComponent;
}

export function getSearchMidwifeEntryDefinition(
  components: IComponent[]
): ISearchMidwifeEntryDefinition {
  return {
    headline: getLabelInstance(components, "entryHeadlineLabel", {
      labelKind: "h2",
      text: "Finde deine Hebamme",
    }),
    introText: getBodyInstance(components, "entryIntroBody", {
      body:
        "<p>Suche nach verfügbaren Hebammen in deiner Region – kostenlos und werbefrei.</p>",
    }),
    postalCode: getTextInputInstance(components, "entryPlzTextInput", {
      type: "text",
      labelText: "Für welche Region suchst du?",
      placeholder: "Postleitzahl",
    }),
    birthdate: getDatePickerInstance(components, "entryBirthdateDatePicker", {
      datePickerType: "single",
      dateFormat: "d.m.Y",
      labelText: "Wann kommt / kam dein Kind?",
      placeholder: "Errechneter Geburtstermin",
    }),
    careTypes: getSelectInstance(components, "entryCareTypes", {
      items: [
        { route: "", label: "Vorsorge" },
        { route: "", label: "Geburtsbegleitung" },
        { route: "", label: "Nachsorge" },
      ],
    }),
    invalidPostalCodeLabel: getLabelInstance(
      components,
      "invalidPostalCodeLabel",
      {
        labelKind: "p",
        text: "ungültige Postleitzahl",
      }
    ),
    cancelButton: getButtonInstance(components, "cancelButton", {
      buttonKind: "ghost",
      labelText: "abbrechen",
      usage: "back",
    }),
    startSearchButton: getButtonInstance(components, "startSearchButton", {
      buttonKind: "primary",
      labelText: "Hebamme finden",
      usage: "forward",
    }),
    footerText: getBodyInstance(components, "footerText", {
      body: "<p>Brauchst du Hilfe?</p>",
    }),
    footerImage: getImageInstance(components, "footerImage", {
      route: "",
      label: "Image",
      width: 160,
      height: 130,
    }),
    toolTipBody: getBodyInstance(components, "toolTipBody", {
      body:
        "<p>Wähle eine oder mehrere Betreuungsarten aus. Du weißt nicht, wie diese sich unterscheiden?<br/><br/>Erfahre mehr</p>",
    }),
    searchMidwifeLink: getLinkInstance(components, "searchMidwifeLink", {
      labelText: "Hebammensuche",
      href: "/hebammensuche",
    }),
    toolTipLink: getLinkInstance(components, "toolTipLink", {
      labelText: "Erfahre mehr",
      href: "/",
    }),
  };
}
