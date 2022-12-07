import { HTML, IComponent } from "./IComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type LinkKind = "Link";

export interface ILinkComponent extends IComponent {
  kind: LinkKind;
  href: string;
  labelText: HTML;
  ariaLabel?: string;
}

export const isLink = (obj: IComponent): obj is ILinkComponent =>
  obj?.kind === "Link";

export const isLinkInstance = (
  obj: IComponent,
  id: string
): obj is ILinkComponent => isLink(obj) && obj.id === id;

export const findLinkInstance = (array: IComponent[], id: string) =>
  findComponentInstance<ILinkComponent>("Link", array, id);

export const getLinkInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ILinkComponent, "kind" | "id">
) => getComponentInstance("Link", array, id, fallback);
