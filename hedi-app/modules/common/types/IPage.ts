import { IEntityTranslated } from "@/modules/model";
import { Component } from "@/modules/components/types";
import { IWizard } from "./IWizard";

export enum PageVisibility {
  Public = 0,
  LoggedIn = 1,
  User = 2,
  Internal = 3,
}

export interface IPage extends IEntityTranslated {
  id: string;
  visibility: PageVisibility;
  components: Component[];

  isPartOfWizard?: boolean;
  wizard?: IWizard;
}

export const isIPage = (obj: any): obj is IPage =>
  obj != null && obj?.type === "Page";
