import { IMenuComponent } from "@/modules/components";

export type IBackToHome = IBackToHomeDefinition;

export interface IBackToHomeDefinition extends IMenuComponent {
  id?: "backToHome";
  labelText: string;
}
