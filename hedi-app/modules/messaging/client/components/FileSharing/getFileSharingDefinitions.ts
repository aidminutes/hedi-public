import { getLabelInstance, IComponent } from "@/modules/components";
import { getSuggestionEntryDefinition } from "../SuggestionEntry";
import { IFileSharingDefinition } from "./types";

export const getCallFileSharingDefinition = (
  components: IComponent[]
): IFileSharingDefinition => {
  return {
    takePictureButton: getLabelInstance(components, "takePictureButton", {
      labelKind: "span",
      text: "Foto aufnehmen"
    }),
    selectPictureButton: getLabelInstance(components, "selectPictureButton", {
      labelKind: "span",
      text: "Foto Auswählen"
    }),
    selectFileButton: getLabelInstance(components, "selectFileButton", {
      labelKind: "span",
      text: "Datei auswählen"
    }),
    closeButton: getLabelInstance(components, "closeButton", {
      labelKind: "span",
      text: "Schließen"
    }),
    addImageButton: getLabelInstance(components, "addImageButton", {
      labelKind: "span",
      text: "Bild hinzufügen"
    }),
  };
};
