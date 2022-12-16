import { gqPick, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIEntity, GQIMutationResponse } from "@/modules/model/server";

const GQInsertMediaMutationResponse = {
  ...GQIMutationResponse,
  media: gqPick(GQIEntity, ["route"]),
};

export const GQInsertMedia = withArgs(
  { insertMedia: GQInsertMediaMutationResponse },
  "insertMedia",
  { input: "$input", lang: "$lang" }
);
