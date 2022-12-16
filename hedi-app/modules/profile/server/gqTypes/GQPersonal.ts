import {
  GQDate,
  GQString,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import { GQIMutationResponse } from "@/modules/model/server";
import { GQIUserProfile } from "./GQIUserProfile";
import { IPersonal, IUpsertPersonalResponse } from "../../types";

const gqPersonal: IPersonal = {
  ...GQIUserProfile,
  birthDate: GQDate,
};

export const GQPersonal = withInlineFragment(gqPersonal, "Personal");

export const GQUpsertPersonalResponse: IUpsertPersonalResponse = {
  ...GQIMutationResponse,
  route: GQString,
  data: GQPersonal,
};
