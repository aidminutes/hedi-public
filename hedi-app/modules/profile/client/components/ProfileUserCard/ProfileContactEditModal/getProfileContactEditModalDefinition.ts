import {
  getBodyInstance,
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IBodyComponent,
  IComponent,
  ILabelComponent,
  ISelectComponent,
  ITextInputComponent,
} from "@/modules/components";

export interface IEditContact {
  editContactIntroBody: IBodyComponent;
  editContactIntroPersonalBody: IBodyComponent;
  emailTextInput: ITextInputComponent;
  websiteTextInput: ITextInputComponent;
  phoneTextInput: ITextInputComponent;
  phoneExplanationLabel: ILabelComponent;
  modalContactHeadlineLabel: ILabelComponent;
  invalidEmailLabel: ILabelComponent;
  invalidWebsiteLabel: ILabelComponent;
  emailVisibilitySelect: ISelectComponent;
  requiredHint: ILabelComponent;
}

export const getProfileContactEditModalDefinition = (
  components: IComponent[]
): IEditContact => ({
  editContactIntroBody: getBodyInstance(components, "editContactIntroBody", {
    body:
      "<p>Mit HEDIs Messenger kannst du jederzeit mit deinen Betreuungen kommunizieren und neue Anfragen erhalten. Bei Bedarf kannst du hier weitere Kontaktmöglichkeiten angeben.</p>",
  }),
  editContactIntroPersonalBody: getBodyInstance(components, "editContactIntroPersonalBody", {
    body:
      "<p>Mit HEDIs Messenger kannst du Anfragen an Hebammen verschicken und mit ihnen kommunizieren. Bei Bedarf kannst du hier weitere Kontaktmöglichkeiten angeben.</p>",
  }),
  phoneExplanationLabel: getLabelInstance(components, "phoneExplanationLabel", {
    labelKind: "p",
    text:
      "Gib deine Telefonummer nur an, wenn du auch telefonisch erreichbar sein möchtest.",
  }),
  emailTextInput: getTextInputInstance(components, "emailTextInput", {
    type: "text",
    labelText: "E-Mail",
  }),
  websiteTextInput: getTextInputInstance(components, "websiteTextInput", {
    type: "text",
    labelText: "Webseite",
  }),
  phoneTextInput: getTextInputInstance(components, "phoneTextInput", {
    type: "text",
    labelText: "Telefon",
  }),
  modalContactHeadlineLabel: getLabelInstance(
    components,
    "modalContactHeadlineLabel",
    { labelKind: "h3", text: "Deine Kontaktdaten" }
  ),
  invalidEmailLabel: getLabelInstance(components, "invalidEmailLabel", {
    labelKind: "p",
    text: "E-Mail ungültig",
  }),
  invalidWebsiteLabel: getLabelInstance(components, "invalidWebsiteLabel", {
    labelKind: "p",
    text: "Webseite ungültig",
  }),
  emailVisibilitySelect: getSelectInstance(
    components,
    "emailVisibilitySelect",
    { items: [] }
  ),
  requiredHint: getLabelInstance(components, "requiredHint", {
    labelKind: "p",
    text: "* Pflichtfeld",
  }),
});
