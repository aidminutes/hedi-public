import { ILanguage } from "@/modules/common/types";
import { ICareType } from "@/modules/networking/types/ICareType";
import { IService } from "@/modules/profile/types";

export interface ISearchMidwifeInput {
  // TODO should later be defined by request, api or even better server/query
  expectedDeliveryDate: Date;
  pregnancyLatLong: string;
  pregnancyPlz: string;
  careTypes: Pick<ICareType, "route" | "label">[];
  languages: Pick<ILanguage, "route" | "label">[];
  services: Pick<IService, "route" | "label">[];
}
