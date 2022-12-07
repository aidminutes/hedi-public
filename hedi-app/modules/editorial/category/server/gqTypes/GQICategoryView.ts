import { GQScalar } from "@/modules/graphql/server/gq-ts";
import { IComponent } from "@/modules/components/types/IComponent";
import { ICategoryView } from "../../types";
import { GQICategory } from "./GQICategory";

export const GQICategoryView: ICategoryView = {
  ...GQICategory,
  components: [GQScalar<IComponent>()],
};
