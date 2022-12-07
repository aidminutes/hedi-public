import { GQILanguage } from "@/modules/common/server/gqTypes/GQILanguage";
import { GQDate, GQString } from "@/modules/graphql/server/gq-ts";
import {
  GQIMutationResponse,
  GQIStateful,
  GQIWithType,
} from "@/modules/model/server";
import { GQService } from "@/modules/profile/server/gqTypes/GQService";
import { GQPregnancyEntry } from "@/modules/profile/server/gqTypes/GQPregnancyEntry";
import { GQICareType } from "./GQICareType";
import { GQOwnerProfile } from "./GQOwnerProfile";
import { GQMidwifeCareConnection } from "./GQIConnection";
import {
  ITransitionMidwifeCareRequestResponse,
  IUpsertMidwifeCareRequestResponse,
  MidwifeCareRequest,
} from "../../types";

export const GQMidwifeCareRequest: MidwifeCareRequest = {
  ...GQIWithType,
  created: GQDate,
  careTypes: [GQICareType],
  languages: [GQILanguage],
  services: [GQService],
  pregnancy: GQPregnancyEntry,
  ownerProfile: GQOwnerProfile,
  recipients: [GQMidwifeCareConnection],
  ...GQIStateful,
  label: GQString,
  body: GQString,
};

export const GQTransitionMidwifeCareRequestResponse: ITransitionMidwifeCareRequestResponse = {
  ...GQIMutationResponse,
  data: GQMidwifeCareRequest,
};

export const GQUpsertMidwifeCareRequestResponse: IUpsertMidwifeCareRequestResponse = {
  ...GQIMutationResponse,
  data: GQMidwifeCareRequest,
};
