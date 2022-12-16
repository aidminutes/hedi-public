import { IProfileEntry } from "@/modules/profile/types";
import { IComponent } from "./IComponent";
import { findComponentInstance } from "./utils";

export type ProfileRoutesKind = "Profiles";

export interface IProfileRoutesComponent extends IComponent {
  kind: ProfileRoutesKind;
  routes: string[];
}

export const isProfileRoutes = (
  obj: IComponent
): obj is IProfileRoutesComponent => obj?.kind === "Profiles";

export type ProfileEntryKind = "ProfileEntry";

export interface IProfileEntryComponent extends IComponent, IProfileEntry {
  kind: ProfileEntryKind;
}

export const isProfileEntry = (
  obj: IComponent
): obj is IProfileEntryComponent => obj?.kind === "ProfileEntry";

export const isProfileEntryInstance = (
  obj: IComponent,
  route: string
): obj is IProfileEntryComponent => isProfileEntry(obj) && obj.route === route;

export const findProfileEntryInstance = (array: IComponent[], route: string) =>
  findComponentInstance<IProfileEntryComponent>("ProfileEntry", array, route);
