import { IMenuComponent } from "@/modules/components";

export type ActionBarType =
  | "audio"
  | "bookmark"
  | "share"
  | "print"
  | "language";

export interface IActionBarAction extends IMenuComponent {
  type: ActionBarType;
  iconDescription: string;
  onClick: () => void;
  active: boolean;
  children?: IActionBarAction[];
}
