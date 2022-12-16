import useSWR from "swr";
import { MatrixClient } from "matrix-js-sdk";
import { DefaultMessagingNotificationDefinition } from "./DefaultMessagingNotificationDefinition";
import { IMessagingNotificationDefinition } from "./types";
import { getNotificationDefinition } from "../../../request/getNotificationDefinition";

export const useMessagingNotificationDefinition = (
  client?: MatrixClient | null,
  lang?: string
): IMessagingNotificationDefinition => {
  const locale = lang ?? "de";
  const { data } = useSWR<IMessagingNotificationDefinition | null>(
    !!client ? locale : null,
    locale => getNotificationDefinition(locale).then(resp => resp.data ?? null),
    { fallbackData: DefaultMessagingNotificationDefinition }
  );
  return data ?? DefaultMessagingNotificationDefinition;
};
