import { IEntity, IStateful } from "@/modules/model";
import {
  GQIEntity,
  GQIMutationResponse,
  GQIStateful,
} from "@/modules/model/server";
import { GQString, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { ITransitionSysMessageResponse, ISysMessage } from "../../types";

const gqSysMessageSource: IStateful | IEntity = {
  ...GQIEntity,
  ...withInlineFragment(GQIStateful, "IStateful"),
};

const gqSysMessage: ISysMessage = {
  ...GQIStateful,
  route: GQString,
  source: gqSysMessageSource,
  message: GQString,
};

export const GQSysMessage = withInlineFragment(gqSysMessage, "ISysMessage");

const gqTransitionSysMessageResponse: ITransitionSysMessageResponse = {
  ...GQIMutationResponse,
  data: GQSysMessage,
};

export const GQTransitionSysMessageResponse = withInlineFragment(
  gqTransitionSysMessageResponse,
  "TransitionSysMessageResponse"
);
