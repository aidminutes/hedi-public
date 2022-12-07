import { gql, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQIMutationResponse } from "@/modules/model/server";
import { InsertFeedbackResponse } from "../../types/InsertFeedbackResponse";

const gqInsertFeedbackResponse: InsertFeedbackResponse = withArgs(
  { insertFeedback: GQIMutationResponse },
  "insertFeedback",
  { type: "$type", texts: "$texts" }
);

export const insertFeedbackMutationGQ = gql`
  mutation insertFeedback($type: String!, $texts: [String!]!) {
    ${gqInsertFeedbackResponse}
  }
`;
