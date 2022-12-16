import { IEntity } from "./IEntity";

export interface IState extends IEntity {}

export function isIState(obj: any): obj is IState {
  return obj && typeof obj.route === "string" && Array.isArray(obj.actions);
}
