import { GQIEntity } from "@/modules/model/server";
import { GQString } from "@/modules/graphql/server/gq-ts";
import { IProfession } from "../../types";

export const GQProfession: IProfession = {
  ...GQIEntity,
  // parent: GQProfession, this does not work
  forProfileType: [GQString],
};
