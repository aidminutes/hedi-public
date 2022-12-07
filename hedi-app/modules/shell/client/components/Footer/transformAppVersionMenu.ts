import { IMenuComponent } from "@/modules/components";

export function transformAppVersionMenu(menu: IMenuComponent): IMenuComponent {
  if (menu.usage === "appVersion") {
    const versionString = `v${process.env.NEXT_PUBLIC_APP_VERSION}`;
    if (!menu.labelText) menu.labelText = versionString;
    else if (!menu.labelText.endsWith(versionString))
      menu.labelText += " " + versionString;
  }
  return menu;
}
