import { IEntityLocalized, IWithType } from "@/modules/model";
import { IImage } from "@/modules/media/types";

export interface ICategoryEntry extends IEntityLocalized, IWithType {
  image?: IImage;
}
