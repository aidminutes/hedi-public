import { HTML, IComponent, Component } from "./IComponent";
import { ISelectComponent, ISelectItem, isSelect } from "./ISelectComponent";
import { findComponentInstance, getComponentInstance } from "./utils";

export type GroupKind = "Group";

export interface IGroupComponent extends IComponent {
  kind: GroupKind;
  usage: string;
  components: Component[];
  labelText?: HTML;
}

export const isGroup = (obj: IComponent): obj is IGroupComponent =>
  obj?.kind === "Group";

export const isGroupInstance = (
  obj: IComponent,
  id: string
): obj is IGroupComponent => isGroup(obj) && obj.id === id;

export const findGroupInstance = (array: IComponent[], id: string) =>
  findComponentInstance<IGroupComponent>("Group", array, id);

export const getGroupInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<IGroupComponent, "kind" | "id">
) => getComponentInstance("Group", array, id, fallback);

export const serviceGroupToSelect = (
  components: IComponent[],
  id: string
): ISelectComponent => {
  const {
    id: groupId,
    components: children,
    labelText,
  } = getGroupInstance(components, id, { usage: "", components: [] });
  return {
    id: groupId ?? id,
    kind: "Select",
    labelText,
    items: children.filter(isSelect).flatMap(s => s.items),
  };
};

export const filterGroupInstanceByProfession = (
  group: IGroupComponent,
  professionMatchingPattern: string
) => {
  const groups = group.components.filter(isSelect);
  const components = groups
    .map(select => {
      const items = select.items
        .map(item => {
          const professions: string[] = (item as any).professions
            ? (item as any).professions.length == 0
              ? (select as any).professions
              : (item as any).professions
            : (select as any).professions;
          return { ...item, professions } as ISelectItem & {
            professions: string[];
          };
        })
        .filter(
          item =>
            item.professions.length == 0 ||
            item.professions.some(prof =>
              prof.includes(professionMatchingPattern)
            )
        );
      if (!items.length) return null;
      const result = { ...select, items };
      return result;
    })
    .filter(x => x);
  return { ...group, components } as IGroupComponent;
};
