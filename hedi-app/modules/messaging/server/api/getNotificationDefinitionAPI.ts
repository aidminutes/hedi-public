import { sendAPIResult } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { NextApiHandler } from "next";
import { IMessagingNotificationDefinition } from "../../client/context/MessagingContext/notification/types";
import { getNotificationDefinition } from "../query/getNotificationDefinition";

export const getNotificationDefinitionAPI: NextApiHandler<
  IAPIResponse<IMessagingNotificationDefinition>
> = async (req, res) => {
  const { lang } = JSON.parse(req.body) as {
    lang: string;
  };
  const data = await getNotificationDefinition(lang);
  const response: IAPIResponse<IMessagingNotificationDefinition> = !!data
    ? {
        success: !!data,
        data: data,
      }
    : { success: false };
  sendAPIResult(res, response, true);
};
