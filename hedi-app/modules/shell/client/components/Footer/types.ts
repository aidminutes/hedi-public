import { IMenuComponent } from "@/modules/components";

export type IFooterProps = IFooterDefinition;

export interface IFooterDefinition extends IMenuComponent {
  id: "footer";
  components: IMenuComponent[];
}
