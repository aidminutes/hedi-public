import { IMessagingNotificationDefinition } from "./types";

export const DefaultMessagingNotificationDefinition: IMessagingNotificationDefinition = {
  msgDef: {
    conversationRoute: "/de/konversation",
    fileText: "Datei",
    imageText: "Bild",
    hediLinkText: "HEDI Link",
  },
  callDef: {
    conversationRoute: "/de/konversation",
    incomingCallText: "Eingehender Anruf",
    missedIncomingCallText: "Anruf verpasst",
  },
};
