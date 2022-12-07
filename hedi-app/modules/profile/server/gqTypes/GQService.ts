import { GQIEntity } from "@/modules/model/server";
import { GQString } from "@/modules/graphql/server/gq-ts";
import { IService, IServiceGroup } from "../../types/taxonomyTypes";

export const GQService: IService = {
  ...GQIEntity,
  parent: { label: GQString },
};

export const GQServiceGroup: IServiceGroup = {
  ...GQService,
  professions: [GQString],
  services: [GQService],
};
