import { ILabelComponent } from "@/modules/components";
import { ISuggestionEntryDefinition } from "../SuggestionEntry";

export type IFileSharing = IFileSharingContent & IFileSharingDefinition;

export interface IFileSharingContent {
  roomId: string;
  setShowFileSharing: (show: boolean) => void;
}

export interface IFileSharingDefinition {
  takePictureButton: ILabelComponent;
  selectPictureButton: ILabelComponent;
  selectFileButton: ILabelComponent;
  closeButton: ILabelComponent;
  addImageButton: ILabelComponent;
}
