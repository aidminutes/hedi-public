import useSWR from "swr";
import { requestMySysMessages } from "../request";
import { useNotificationContext } from "@/modules/pwr/client";
import { useEffect, useState } from "react";
import { ISysMessage } from "@/modules/sysmessage/types";
import { useUser } from "@/modules/auth/client/hooks";
import { removeHTMLTags } from "@/modules/common/utils/removeHTMLTags";

export function useSysMessageNotifier(lang = "de") {
  const notificationContext = useNotificationContext();
  const [user, userIsLoading] = useUser();
  const [_, setSysMessages] = useState<ISysMessage[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    notificationContext.requestPermission();
  }, [user, notificationContext]);

  const response = useSWR(
    user ? [lang, "notification-pull"] : null,
    (lang: string) => requestMySysMessages(lang, true),
    {
      revalidateOnFocus: false,
      refreshInterval: 20000, // refresh every 20 seconds
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    if (!user) {
      return;
    }
    setSysMessages(oldData => {
      const fetchedData = response.data || [];
      if (fetchedData.length) {
        fetchedData.forEach(sysMessage => {
          notificationContext.queueNotification({
            text: removeHTMLTags(sysMessage.message) || "",
            // TODO route: messageDetailsUrl + '?' + sysMessage.route,
          });
        });
        notificationContext.flushNotificationQueue();
      }
      return fetchedData;
    });
  }, [response.data]);
}
