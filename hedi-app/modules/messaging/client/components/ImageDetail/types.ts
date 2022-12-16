import { IButtonComponent } from "@/modules/components";

export type IImageDetail = IImageDetailContent &
  IImageDetailDefinition &
  IImageDetailConfig;

export interface IImageDetailContent {
  imageUrl: string;
}

export interface IImageDetailDefinition {
  closeButton: IButtonComponent;
}

export interface IImageDetailConfig {
  close: () => void;
}
