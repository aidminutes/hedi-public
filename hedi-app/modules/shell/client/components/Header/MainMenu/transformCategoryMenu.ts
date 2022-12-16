import { IMenuComponent, ISelectComponent } from "@/modules/components";

export function transformCategoryMenu(
  select: ISelectComponent
): IMenuComponent[] {
  return select.items
    .filter(item => item.route.split("/").length <= 3) // NOTE discarding subcategories
    .map(
      item =>
        ({
          kind: "Menu",
          href: item.route,
          labelText: item.label,
        } as IMenuComponent)
    );
}
