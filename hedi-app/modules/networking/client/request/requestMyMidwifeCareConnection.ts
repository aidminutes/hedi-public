import { jsonPost } from "@/modules/common/utils";
import {
  myMidwifeCareConnectionsAPIUrl,
  IMidwifeCareConnection,
} from "@/modules/networking/types";
import { IAPIResponse } from "@/modules/model";
import { sendConnectionTransition } from "./sendConnectionTransition";

export const requestMyMidwifeCareConnection = (
  lang: string,
  route: string,
  markAsRead?: boolean
): Promise<IMidwifeCareConnection | null> =>
  jsonPost<IAPIResponse<IMidwifeCareConnection[]>>(
    myMidwifeCareConnectionsAPIUrl,
    {
      lang,
      routes: [route],
    }
  ).then(async res => {
    let connection = res?.data?.[0] ?? null;
    if (markAsRead && connection && connection.state.route.endsWith("unread")) {
      connection = (
        await sendConnectionTransition(
          connection.route,
          "midwife_care_connection.recipient_read"
        )
      ).data as IMidwifeCareConnection;
    }
    if (connection) {
      connection.changed = new Date(connection.changed);
      connection.created = new Date(connection.created);
      if (connection.sender && connection.sender.created) {
        connection.sender.created = new Date(connection.sender.created);
      }
    }
    return connection;
  });
