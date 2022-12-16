import {
  getLabelInstance,
  IComponent,
  ILabelComponent,
  IButtonComponent,
  getButtonInstance,
  getInlineNotificationInstance,
  IInlineNotificationComponent,
} from "@/modules/components";
import {
  getLanguageSkillsInputDefinition,
  ILanguageSkillsInputDefinition,
} from "../LanguageSkillsInput";

export interface IProfileLanguagesViewDefinition {
  languageSkillsInputDefinition: ILanguageSkillsInputDefinition;
  editLanguagesTitleLabel: ILabelComponent;
  editLanguagesDescriptionLabel: ILabelComponent;
  editLanguagesPersonalDescriptionLabel: ILabelComponent;
  saveButton: IButtonComponent;
  resetButton: IButtonComponent;
  languageErrorNotification: IInlineNotificationComponent;
}

export const getProfileLanguagesEditModalViewDefinition = (
  components: IComponent[]
): IProfileLanguagesViewDefinition => {
  return {
    languageSkillsInputDefinition: getLanguageSkillsInputDefinition(components),
    editLanguagesTitleLabel: getLabelInstance(
      components,
      "editLanguagesTitleLabel",
      {
        labelKind: "label",
        text: "Sprachen",
      }
    ),
    editLanguagesDescriptionLabel: getLabelInstance(
      components,
      "editLanguagesDescriptionLabel",
      {
        labelKind: "paragraph",
        text: "In welchen Sprachen bietest du deine Leistungen an?",
      }
    ),
    editLanguagesPersonalDescriptionLabel: getLabelInstance(
      components,
      "editLanguagesPersonalDescriptionLabel",
      {
        labelKind: "paragraph",
        text: "Welche Sprachen sprichst du?",
      }
    ),
    saveButton: getButtonInstance(components, "saveButton", {
      usage: "",
      buttonKind: "primary",
    }),
    resetButton: getButtonInstance(components, "resetButton", {
      usage: "",
      buttonKind: "ghost",
    }),
    languageErrorNotification: getInlineNotificationInstance(
      components,
      "languageErrorNotification",
      {
        notificationKind: "error",
        title: "Fehler beim Speichern. Prüfe die Daten und versuch es nochmal",
      }
    ),
  };
};
