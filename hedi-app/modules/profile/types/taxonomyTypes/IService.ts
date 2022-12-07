import { IGroupComponent, ISelectComponent } from "@/modules/components";
import { IProfileTaxonomy } from "./IProfileTaxonomy";

export interface IService extends IProfileTaxonomy {
  parent?: { label: string };
}

export interface IServiceGroup extends IService {
  professions: string[];
  services: IService[];
}

export interface IServiceWithChildren extends IService {
  children?: IServiceWithChildren[];
}

export const getGroupifiedServices = (
  services?: IService[]
): IServiceWithChildren[] => {
  if (!services) return [];
  const groupedServices = services.reduce(function (root, item) {
    (root[item.parent?.label || ""] =
      root[item.parent?.label || ""] || []).push(item);
    return root;
  }, {} as Record<string, IService[]>);
  return Object.entries(groupedServices).map(
    ([groupName, items]) =>
      ({
        label: groupName,
        children: items.map(
          item =>
            ({ label: item.label, route: item.route } as IServiceWithChildren)
        ),
        route: "", // HACK no data to be used
      } as IServiceWithChildren)
  );
};

export const getServicesWithChildren = (groupComponent: IGroupComponent) => {
  return groupComponent.components.map(
    group =>
      ({
        label: (group as ISelectComponent).labelText,
        children: (group as ISelectComponent).items.map(subItem => ({
          route: subItem.route,
          label: subItem.label,
          parent: {
            label: (group as ISelectComponent).labelText,
          },
        })),
      } as IServiceWithChildren)
  );
};
