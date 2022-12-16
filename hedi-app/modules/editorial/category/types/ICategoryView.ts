import { IComponent } from "@/modules/components";
import { ICategory } from "./ICategory";

export type ICategoryView = ICategory & ICategoryViewDefinition;

export interface ICategoryViewDefinition {
  components: IComponent[];
}
