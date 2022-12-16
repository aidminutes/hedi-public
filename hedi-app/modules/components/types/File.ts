import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type FileKind = "File";

export interface IFileComponent extends IComponent {
  kind: FileKind;
  route: string;
  labelText: HTML;
  usage?: string;
  mimeType?: string;
}

export const isFile = (obj: IComponent): obj is IFileComponent =>
  obj?.kind === "File";

export const isFileInstance = (
  obj: IComponent,
  id: string
): obj is IFileComponent => isFile(obj) && obj.id === id;

export const findFileInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IFileComponent>("File", array, id);

export const getFileInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IFileComponent, "kind" | "id">
) => getComponentInstance("File", array, id, fallback);
