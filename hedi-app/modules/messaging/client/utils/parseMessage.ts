import DOMPurify from "dompurify";
import { IContent } from "matrix-js-sdk";
import { URLPreviewResponse } from "../../types";

const regexpPhone = new RegExp(
  "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
  "g"
);
const regexpMail = new RegExp(
  "([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)",
  "g"
);

const handleMailAndPhoneContent = (text: string) => {
  let handledText = text;
  let match = null;

  while ((match = regexpPhone.exec(text)) !== null) {
    const pn = `${match[0]}`;
    handledText = handledText.replace(
      pn,
      `<a href="tel:${pn}" target="_blank" className="phone"> ${pn} </a>`
    );
  }

  while ((match = regexpMail.exec(text)) !== null) {
    const mail = `${match[0]}`;
    handledText = handledText.replace(
      mail,
      `<a href="mailto:${mail}" target="_blank" className="phone"> ${mail} </a>`
    );
  }

  return handledText;
};

export const parseMessage = (content: IContent) => {
  let messageContent = "";
  let messageURLPreview: null | URLPreviewResponse = null;

  try {
    const parsedMessageContent = JSON.parse(content.body);
    if (!!parsedMessageContent) {
      // This is a JSON body holding more meta information
      messageContent = DOMPurify.sanitize(parsedMessageContent.text);

      if (!!parsedMessageContent.preview) {
        // Found URL with a preview inside
        messageURLPreview = parsedMessageContent.preview as URLPreviewResponse;
      }
    }
  } catch (_) {
    // Message body is not in JSON format - use unparsed
    messageContent = DOMPurify.sanitize(content.body);
  }

  return {
    messageContent: handleMailAndPhoneContent(messageContent),
    messageURLPreview,
  };
};
