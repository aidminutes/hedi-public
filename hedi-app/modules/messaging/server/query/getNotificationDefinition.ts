import { IPage } from "@/modules/common/types";
import { logAndFallback } from "@/modules/common/error";
import { GQIPage } from "@/modules/common/server/gqTypes/GQIPage";
import { serviceGQuery } from "@/modules/graphql";
import { gql, gqPick, withArgs } from "@/modules/graphql/server/gq-ts";
import { IComponent } from "@/modules/components/types/IComponent";
import { IMessagingNotificationDefinition } from "../../client/context/MessagingContext/notification/types";
import { getMessagingNotificationDefinition } from "../../client/context/MessagingContext/notification/getMessagingNotificationDefinition";

type NotificationDefinitionResponse = {
  pagesById: Pick<IPage, "components">[];
};

export const notificationDefinitionResponseGQ: NotificationDefinitionResponse = {
  pagesById: [gqPick(GQIPage, ["components"])],
};

export const getNotificationDefinitionQuery = gql`
  query getMessagingNotificationDefinition(
    $lang: String!
  ) { 
    ${withArgs(notificationDefinitionResponseGQ, "pagesById", {
      ids: ["msg.notifications"],
      lang: "$lang",
    })} 
  }
`;

export async function getNotificationDefinition(
  lang: string
): Promise<IMessagingNotificationDefinition> {
  const {
    pagesById: [msgNotificationsPage],
  } = await serviceGQuery<NotificationDefinitionResponse>(
    getNotificationDefinitionQuery,
    {
      lang,
    }
  ).then(data =>
    logAndFallback(data, {
      pagesById: [],
    } as NotificationDefinitionResponse)
  );

  return getMessagingNotificationDefinition(msgNotificationsPage.components);
}
