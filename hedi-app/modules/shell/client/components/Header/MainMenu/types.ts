import { IMenuComponent } from "@/modules/components";

export type IMainMenuProps = IMainMenuDefinition;

export interface IMainMenuDefinition extends IMenuComponent {
  id?: "main";
  components: IMenuComponent[];
}
