import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type VideoKind = "Video";

export interface IVideoComponent extends IComponent {
  kind: VideoKind;
  route: string;
  labelText: HTML;
  usage?: string;
  mimeType?: string;
}

export const isVideo = (obj: IComponent): obj is IVideoComponent =>
  obj?.kind === "Video";

export const isVideoInstance = (
  obj: IComponent,
  id: string
): obj is IVideoComponent => isVideo(obj) && obj.id === id;

export const findVideoInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IVideoComponent>("Video", array, id);

export const getVideoInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IVideoComponent, "kind" | "id">
) => getComponentInstance("Video", array, id, fallback);
