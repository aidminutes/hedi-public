import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";
import { userGQuery } from "@/modules/graphql";
import { gql, GQBoolean, withArgs } from "@/modules/graphql/server/gq-ts";

type HasMyFeedbackResponse = {
  hasFeedback: boolean;
};

const hasMyFeedbackGQ: HasMyFeedbackResponse = withArgs(
  { hasFeedback: GQBoolean },
  "hasFeedback",
  { type: "$type" }
);

const hasMyFeedbackQuery = gql`
query hasMyFeedbackQuery($type: String!) {
  ${hasMyFeedbackGQ}
}
`;

export async function hasMyFeedback(
  authHeader: IAuthHeader,
  type: string
): Promise<boolean | null> {
  const queryResult = await userGQuery<HasMyFeedbackResponse>(
    authHeader,
    hasMyFeedbackQuery,
    { type }
  ).then(data =>
    logAndFallback(data, {
      hasFeedback: false,
    })
  );
  return queryResult.hasFeedback;
}
