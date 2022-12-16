import { DocumentBlank16, Image16, Link16 } from "@carbon/icons-react";
import { MsgType } from "matrix-js-sdk";
import { parseMessage } from "../../utils/parseMessage";
import { IMessageEventDescDefinition, MatrixMessageEvent } from "./types";

export function getMessageEventDescription(
  event: MatrixMessageEvent,
  messageEventDescDefinition: IMessageEventDescDefinition
) {
  const { fileText, imageText, hediLinkText } = messageEventDescDefinition;

  const content = event.getContent();
  switch (content.msgtype) {
    case MsgType.Text:
      return {
        icon: null,
        text: parseMessage(event.getContent()).messageContent,
      };
    case MsgType.Image:
      return {
        icon: <Image16 style={{ color: "#979797" }} />,
        text: imageText,
      };

    case MsgType.File:
      return {
        icon: <DocumentBlank16 style={{ color: "#979797" }} />,
        text: fileText,
      };
    case "m.hedilink":
      return {
        icon: <Link16 style={{ color: "#979797" }} />,
        text: hediLinkText,
      };
    default:
      console.warn("Message type not supported", content.msgtype);
      return null;
  }
}
