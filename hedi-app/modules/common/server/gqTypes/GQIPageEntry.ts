import { GQString } from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized, GQIWithType } from "@/modules/model/server";
import { IPageEntry } from "../../types/IPageEntry";

export const GQIPageEntry: IPageEntry = {
  ...GQIWithType,
  ...GQIEntityLocalized,
  id: GQString,
  description: GQString,
};
