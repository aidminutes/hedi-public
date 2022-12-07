import { IProfileTaxonomy } from "./IProfileTaxonomy";

export interface IProfession extends IProfileTaxonomy {
  parent?: IProfession;
  forProfileType: string[];
}
