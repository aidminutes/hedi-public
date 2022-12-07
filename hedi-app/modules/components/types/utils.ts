import { Component, ComponentKind, IComponent } from "./IComponent";

export function isComponentInstance<T extends IComponent>(
  kind: ComponentKind,
  obj: IComponent,
  id: string
): obj is T {
  return obj.kind === kind && obj.id === id;
}

export function findComponentInstance<T extends IComponent>(
  kind: ComponentKind,
  array: IComponent[],
  id: string
): Extract<Component, T> | undefined {
  return array.find(item => isComponentInstance(kind, item, id)) as
    | Extract<Component, T>
    | undefined;
}

export function getComponentInstance<T extends IComponent>(
  kind: ComponentKind,
  array: IComponent[],
  id: string,
  fallback: Omit<T, "kind" | "id">
): Extract<Component, T> {
  const element = findComponentInstance(kind, array, id);
  if (element) return element as Extract<Component, T>;
  else {
    console.warn(`${kind}Component[${id}] not found, resorting to fallback`);
    return {
      kind,
      id,
      ...fallback,
    } as Extract<Component, T>;
  }
}

//-------------------------

export function isComponentKind<T extends IComponent>(
  kind: ComponentKind,
  obj: IComponent
): obj is T {
  return obj.kind === kind;
}

export function findComponentKind<T extends IComponent>(
  kind: ComponentKind,
  array: IComponent[]
): Extract<Component, T> | undefined {
  return array.find(item => isComponentKind(kind, item)) as
    | Extract<Component, T>
    | undefined;
}

export function getComponentKind<T extends IComponent>(
  kind: ComponentKind,
  array: IComponent[],
  fallback: Omit<T, "kind">
): Extract<Component, T> {
  const element = findComponentKind(kind, array);
  if (element) return element as Extract<Component, T>;
  else {
    console.warn(`${kind}Component not found, resorting to fallback`);
    return {
      kind,
      ...fallback,
    } as Extract<Component, T>;
  }
}
