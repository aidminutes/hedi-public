import {
  getButtonInstance,
  getImageInstance,
  getLabelInstance,
  getLinkInstance,
  getToastNotificationInstance,
  IComponent,
} from "@/modules/components/types";

export const getProfileEditImageViewDefinition = (components: IComponent[]) => {
  return {
    selectImageDropboxButton: getButtonInstance(
      components,
      "selectImageDropboxButton",
      {
        buttonKind: "primary",
        usage: "dropbox",
        text: "Profilbild hierher ziehen oder hier klicken",
      }
    ),
    selectImageFileUploaderButton: getButtonInstance(
      components,
      "selectImageFileUploaderButton",
      {
        buttonKind: "primary",
        usage: "button",
        text: "Profilbild hinzufügen",
      }
    ),
    selectAnotherImageButton: getButtonInstance(
      components,
      "selectAnotherImageButton",
      {
        buttonKind: "secondary",
        usage: "button",
        text: "Anderes Bild wählen",
      }
    ),
    uploadImageButton: getButtonInstance(components, "uploadImageButton", {
      buttonKind: "primary",
      usage: "button",
      text: "Als Profilbild nutzen",
    }),
    newProfileImageLabel: getLabelInstance(components, "newProfileImageLabel", {
      text: "Neues Profilbild",
      labelKind: "span",
    }),
    backToProfileButton: getButtonInstance(components, "backToProfileButton", {
      buttonKind: "ghost",
      usage: "link",
      text: "Zurück zum Profil",
      href: "/de/konto/profil", // TODO could I write this?
    }),
    cropperHelpLabel: getLabelInstance(components, "cropperHelpLabel", {
      text:
        "Ziehen Sie die Ecken des Bildes um den gewünschten Bildausschnitt zu wählen.",
      labelKind: "p",
    }),
    cancelButton: getButtonInstance(components, "cancelButton", {
      buttonKind: "ghost",
      usage: "button",
      text: "Abbrechen",
    }),
    currentImageLabel: getLabelInstance(components, "currentImageLabel", {
      text: "Derzeitiges Profilbild",
      labelKind: "p",
    }),
    deleteImageButton: getButtonInstance(components, "deleteImageButton", {
      buttonKind: "ghost",
      usage: "button",
      text: "Profilbild entfernen",
    }),
    invalidFileNotification: getToastNotificationInstance(
      components,
      "invalidFileNotification",
      {
        title: "Datei ungültig",
        notificationKind: "error",
      }
    ),
    successNotification: getToastNotificationInstance(
      components,
      "successNotification",
      {
        title: "Erfolg",
        subtitle: "Ihr Profilbild wurde aktualisiert.",
        notificationKind: "success",
      }
    ),
    failureNotification: getToastNotificationInstance(
      components,
      "failureNotification",
      {
        title: "Etwas ist schiefgelaufen",
        subtitle:
          "Ihr Bild konnte nicht geladen werden. Versuchen sie es später erneut.",
        notificationKind: "error",
      }
    ),
    deleteImageFailureNotification: getToastNotificationInstance(
      components,
      "deleteImageFailureNotification",
      {
        title: "Etwas ist schiefgelaufen",
        notificationKind: "error",
      }
    ),
    editProfileLink: getLinkInstance(components, "editProfileLink", {
      href: "/de/konto/profil/bearbeiten", // TODO could I write this
      labelText: "Profil bearbeiten",
    }),
  };
};
