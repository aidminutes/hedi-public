import { IImage, IImageMetadata } from "@/modules/media/types";
import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type ImageKind = "Image";

export interface IImageComponent extends IComponent, IImageMetadata {
  kind: ImageKind;
  route: string;
  label: HTML;
  usage?: string;
}

export const isImage = (obj: IComponent): obj is IImageComponent =>
  obj?.kind === "Image";

export const isImageInstance = (
  obj: IComponent,
  id: string
): obj is IImageComponent => isImage(obj) && obj.id === id;

export const findImageInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IImageComponent>("Image", array, id);

export const getImageInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IImageComponent, "kind" | "id">
) => getComponentInstance("Image", array, id, fallback);

export const imageToImageComponent = (
  img?: IImage
): IImageComponent | undefined => {
  if (!img) return img;
  const kind = "Image";
  return { kind, ...img };
};
