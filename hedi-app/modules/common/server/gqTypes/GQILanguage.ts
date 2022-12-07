import { GQString } from "@/modules/graphql/server/gq-ts";
import { GQIEntity } from "@/modules/model/server";
import { ILanguage } from "../../types/ILanguage";

export const GQILanguage: ILanguage = {
  ...GQIEntity,
  direction: GQString,
};
