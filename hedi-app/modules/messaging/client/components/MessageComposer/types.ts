import { IButtonComponent, ITextAreaComponent } from "@/modules/components";
import { IFileSharingDefinition } from "../FileSharing/types";
import { IQuickSearchDefinition } from "../QuickSearch";

export type IMessageComposer = IMessageComposerContent &
  IMessageComposerDefinition &
  IMessageComposerConfig;

export interface IMessageComposerContent {
  roomId: string;
  setShowFileSharing: (show: boolean) => void;
  showFileSharing: boolean;
}

export interface IMessageComposerDefinition {
  quickSearchDefinition: IQuickSearchDefinition;
  fileSharingDefinition: IFileSharingDefinition;
  quickSearchButton: IButtonComponent;
  textArea: ITextAreaComponent;
  sendButton: IButtonComponent;
  shareButton: IButtonComponent;
}

export interface IMessageComposerConfig {
  lang: string;
}
