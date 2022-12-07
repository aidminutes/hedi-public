import {
  getBodyInstance,
  getButtonInstance,
  getLabelInstance,
  getDatePickerInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
  ISelectItem,
} from "@/modules/components";
import { IUpsertProfileViewDefinition } from "./ProfileEdit";
import {
  getAddressesInputDefinition,
  getConsultationHoursInputDefinition,
  getEmailsInputDefinition,
  getLanguageSkillsInputDefinition,
  getPhonesInputDefinition,
  getWebsitesInputDefinition,
} from "..";
import { getServicesInputDefinition } from "../ServicesInput";

export const getUpsertProfileViewDefinition = (
  components: IComponent[]
): IUpsertProfileViewDefinition => ({
  professionSelect: filterProfessionalItems(components),
  nameLabel: getLabelInstance(components, "name", {
    labelKind: "span",
    text: "Name",
  }),
  prefixTextInput: getTextInputInstance(components, "prefixTextInput", {
    type: "text",
    labelText: "Prefix",
  }),
  givenNameTextInput: getTextInputInstance(components, "givenNameTextInput", {
    type: "text",
    labelText: "Vorname",
  }),
  familyNameTextInput: getTextInputInstance(components, "familyNameTextInput", {
    type: "text",
    labelText: "Nachname",
  }),
  addressesInputDefinition: getAddressesInputDefinition(components),
  phonesInputDefinition: getPhonesInputDefinition(components),
  emailsInputDefinition: getEmailsInputDefinition(components),
  websitesInputDefinition: getWebsitesInputDefinition(components),
  languageSkillsInputDefinition: getLanguageSkillsInputDefinition(components),
  consultationHoursInputDefinition: getConsultationHoursInputDefinition(
    components
  ),
  servicesInputDefinition: getServicesInputDefinition(components),
  profileSaveButton: getButtonInstance(components, "profileSaveButton", {
    buttonKind: "primary",
    usage: "",
    text: "Profil speichern",
  }),
  introText: getBodyInstance(components, "introText", {
    body: "<p>Text missing</p>",
  }),
  professionHeadline: getLabelInstance(components, "professionHeadline", {
    labelKind: "h2",
    text: "Beruf",
  }),
  birthDateDatePicker: getDatePickerInstance(
    components,
    "birthDateDatePicker",
    { datePickerType: "single", dateFormat: "d.m.Y", labelText: "Geburtstag" }
  ),
  headline: getLabelInstance(components, "mainHeadline", {
    labelKind: "h1",
    text: "Profil anlegen",
  }),
});

const filterProfessionalItems = (array: IComponent[]) => {
  const professionalSelect = getSelectInstance(array, "professionSelect", {
    items: [],
  });
  // TODO better handling possible
  const filteredItems = professionalSelect.items.filter(
    item => item.forProfileType && item.forProfileType.includes("Professional")
  ) as ISelectItem[];
  professionalSelect["items"] = filteredItems;
  return professionalSelect;
};
