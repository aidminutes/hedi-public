import { jsonPost } from "@/modules/common/utils";
import { chatRoomAPIUrl, ICareConnectionRoomResponse } from "../../types";

export const getMidwifeCareConnectionChatRoomId = (connectionRoute: string) => {
  return jsonPost<ICareConnectionRoomResponse>(chatRoomAPIUrl, {
    route: connectionRoute,
  })
    .then(data => data ?? { success: false })
    .catch(err => console.log("Error post request: ", err));
};
