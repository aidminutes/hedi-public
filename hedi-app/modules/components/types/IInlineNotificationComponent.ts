import { IComponent } from "./IComponent";
import { INotification } from "./INotification";
import { findComponentInstance, getComponentInstance } from "./utils";

export type InlineNotificationKind = "InlineNotification";

export interface IInlineNotificationComponent extends INotification {
  kind: InlineNotificationKind;
}

export const isInlineNotification = (
  obj: IComponent
): obj is IInlineNotificationComponent => obj?.kind === "InlineNotification";

export const isInlineNotificationInstance = (
  obj: IComponent,
  id: string
): obj is IInlineNotificationComponent =>
  isInlineNotification(obj) && obj.id === id;

export const findInlineNotificationInstance = (
  array: IComponent[],
  id: string
) =>
  findComponentInstance<IInlineNotificationComponent>(
    "InlineNotification",
    array,
    id
  );

export const getInlineNotificationInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IInlineNotificationComponent, "kind" | "id">
) => getComponentInstance("InlineNotification", array, id, fallback);
