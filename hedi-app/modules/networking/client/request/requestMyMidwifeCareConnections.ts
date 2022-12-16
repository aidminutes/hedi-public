import { jsonPost } from "@/modules/common/utils";
import {
  myMidwifeCareConnectionsAPIUrl,
  IConnection,
} from "@/modules/networking/types";
import { IAPIResponse } from "@/modules/model";

export const requestMyMidwifeCareConnections = (
  lang: string
): Promise<IConnection[] | null> =>
  jsonPost<IAPIResponse<IConnection[]>>(myMidwifeCareConnectionsAPIUrl, {
    lang,
  }).then(res => {
    if (res?.data) {
      res?.data.forEach(conn => {
        conn.created = new Date(conn.created);
        conn.changed = new Date(conn.changed);
        if (conn.sender && (conn.sender as any).created) {
          (conn.sender as any).created = new Date((conn.sender as any).created);
        }
      });
    }
    return res?.data ?? null;
  });
