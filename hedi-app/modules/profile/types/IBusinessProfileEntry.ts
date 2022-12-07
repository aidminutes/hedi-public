import { IEntityLocalized, IWithType } from "@/modules/model";
import { IProfession } from "./taxonomyTypes";
import { IAddress } from "./dataTypes";

export interface IBusinessProfileEntry extends IEntityLocalized, IWithType {
  profession: IProfession;
  addresses: IAddress[];
}
