import { IFile } from "./IFile";

export interface IImageMetadata {
  width: number;
  height: number;
  alt?: string;
  color?: string;
  blurDataURL?: string;
}
export interface IImage extends IFile, IImageMetadata {}
