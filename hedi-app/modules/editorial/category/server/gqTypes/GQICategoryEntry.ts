import { GQIImage } from "@/modules/media/server/gqTypes/GQMedia";
import { GQIEntityLocalized, GQIWithType } from "@/modules/model/server";
import { ICategoryEntry } from "../../types";

export const GQICategoryEntry: ICategoryEntry = {
  ...GQIWithType,
  ...GQIEntityLocalized,
  image: GQIImage,
};
