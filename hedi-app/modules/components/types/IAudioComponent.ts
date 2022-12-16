import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type AudioKind = "Audio";

export interface IAudioComponent extends IComponent {
  kind: AudioKind;
  route: string;
  labelText: HTML;
  usage?: string;
  mimeType?: string;
  visible?: boolean;
}

export const isAudio = (obj: IComponent): obj is IAudioComponent =>
  obj?.kind === "Audio";

export const isAudioInstance = (
  obj: IComponent,
  id: string
): obj is IAudioComponent => isAudio(obj) && obj.id === id;

export const findAudioInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IAudioComponent>("Audio", array, id);

export const getAudioInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IAudioComponent, "kind" | "id">
) => getComponentInstance("Audio", array, id, fallback);
