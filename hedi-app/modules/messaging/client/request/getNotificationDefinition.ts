import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { notificationDefinitionAPIUrl } from "../../types/APIUrls";
import { IMessagingNotificationDefinition } from "../context/MessagingContext/notification/types";

export const getNotificationDefinition = (
  lang: string
): Promise<IAPIResponse<IMessagingNotificationDefinition | undefined>> =>
  jsonPost<IAPIResponse<IMessagingNotificationDefinition | undefined>>(
    notificationDefinitionAPIUrl,
    {
      lang,
    }
  ).then(data => (data ? data : { success: false }));
