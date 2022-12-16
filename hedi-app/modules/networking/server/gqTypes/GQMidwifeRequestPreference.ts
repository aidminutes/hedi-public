import {
  GQBoolean,
  GQNumber,
  GQString,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import { GQIMutationResponse, GQIWithType } from "@/modules/model/server";
import {
  IMidwifeRequestPreference,
  IUpsertMidwifeRequestPreferenceResponse,
} from "@/modules/networking/types";

const gqMidwifeRequestPreference: IMidwifeRequestPreference = {
  ...GQIWithType,
  route: GQString,
  searchable: GQBoolean,
  radius: GQNumber,
  defaultCapacity: GQNumber,
  anonymousRequest: GQBoolean,
  directCareRequest: GQBoolean,
};

export const GQMidwifeRequestPreference = withInlineFragment(
  gqMidwifeRequestPreference,
  "MidwifeRequestPreference"
);

export const GQUpsertMidwifeRequestPreferenceResponse: IUpsertMidwifeRequestPreferenceResponse = {
  ...GQIMutationResponse,
  data: GQMidwifeRequestPreference,
};
