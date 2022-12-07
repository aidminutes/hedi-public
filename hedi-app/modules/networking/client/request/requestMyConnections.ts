import { jsonFetcher } from "@/modules/common/utils";
import { myConnectionsAPIUrl, IConnection } from "@/modules/networking/types";
import { IAPIResponse } from "@/modules/model";

export const requestMyConnections = (): Promise<IConnection[] | null> =>
  jsonFetcher<IAPIResponse<IConnection[]>>(myConnectionsAPIUrl).then(res => {
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
