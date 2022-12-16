import {
  GQBoolean,
  GQDate,
  gql,
  GQScalar,
  GQString,
  withArgs,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import { GQIEntity, GQIMutationResponse } from "@/modules/model/server";
import { IFeedback } from "../../types";

export const GQIFeedback: IFeedback = {
  ...GQIEntity,
  body: GQString,
  metadata: GQScalar(),
  created: GQDate,
};

export const GQFeedback = withInlineFragment(GQIFeedback, "Feedback");
