import {
  Attachment32,
  CheckmarkFilled16,
  Download32,
  Hourglass16,
} from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { useMatrixClient } from "../../context/MatrixClientContext";
import { parseMessage } from "../../utils/parseMessage";
import { ImageDetail } from "../../components/ImageDetail";
import { TimelineSuggestionEntry } from "../TimelineSuggestionEntry";
import { IMessageEvent } from "./types";

export const MessageEvent = (props: IMessageEvent) => {
  const {
    event,
    isOwnEvent,
    formattedEventDate,
    sideSwap,
    onImageLoaded,
    isFirstInGroup,
    read,
    ...definition
  } = props;
  const { imageDetailDefinition, suggestionEntryDefinition } = definition;
  const client = useMatrixClient();
  const sender = !!isOwnEvent ? "user" : "contact";
  const content = event.getContent();

  const size =
    (window.innerWidth > window.innerHeight
      ? window.innerWidth
      : window.innerHeight) * 0.85;

  const imageUrl = client.mxcUrlToHttp(content.url, size, size, "scale", true);
  const downloadUrl = client.mxcUrlToHttp(content.url);

  // Show ImageDetail panel if the user clicked on image in chat
  const [showImageDetail, setShowImageDetail] = useState(false);

  const { messageContent, messageURLPreview } = parseMessage(content);

  const messageWithImage = useMemo(() => {
    return (
      <bdo className={"hedi--msg-message--body"}>
        <img
          onLoad={() => {
            onImageLoaded();
          }}
          src={imageUrl ?? ""}
          alt=""
          onClick={() => setShowImageDetail(true)}
        />
      </bdo>
    );
  }, [imageUrl]);

  const messageWithFile = useMemo(() => {
    return (
      <a
        href={downloadUrl ?? ""}
        target={"_blank"}
        className={`hedi--msg-message--body-file ${sender}`}>
        <Attachment32 />
        {content.filename}
        <div className={`download`}>
          <Download32 />
        </div>
      </a>
    );
  }, [content, sender]);

  const messageWithText = useMemo(() => {
    if (!!messageURLPreview && !!messageURLPreview.url) {
      return (
        <div>
          <div
            className={`urlPreview ${sender}`}
            onClick={() => window.open(messageURLPreview.url, "_blank")}>
            {messageURLPreview.images[0] && (
              <div
                className="thumbnail"
                style={{
                  backgroundImage: `url("${messageURLPreview.images[0]}")`,
                }}
              />
            )}
            <div className="wrapper">
              {messageURLPreview.title && (
                <h3 className="title">{messageURLPreview.title}</h3>
              )}
              {messageURLPreview.description && (
                <p className="preview">{messageURLPreview.description}</p>
              )}
              {messageURLPreview.siteName && (
                <h5 className="site">{messageURLPreview.siteName}</h5>
              )}
            </div>
          </div>
          <div
            style={{ marginTop: 8 }}
            dangerouslySetInnerHTML={{ __html: messageContent }}
          />
        </div>
      );
    } else {
      return (
        <bdo
          className={"hedi--msg-message--body"}
          dangerouslySetInnerHTML={{ __html: messageContent }}
        />
      );
    }
  }, [messageContent, messageURLPreview]);

  const messageWithHediLink = useMemo(() => {
    return (
      <TimelineSuggestionEntry
        {...suggestionEntryDefinition}
        inTimeline={true}
        route={content.body}
      />
    );
  }, [suggestionEntryDefinition, content]);

  const eventDate = formattedEventDate ?? event?.getDate()?.toLocaleString();

  return (
    <div
      className={`hedi--msg-message-from ${sender} ${
        sideSwap ? " sideSwap" : " "
      }`}
      id={event.getId()}>
      <div className={`hedi--msg-message-box ${sender}`}>
        {isFirstInGroup && (
          <div className={`hedi--msg-message-box-first-in-group-${sender}`} />
        )}

        {content.msgtype === "m.text" && messageWithText}
        {content.msgtype === "m.image" && messageWithImage}
        {content.msgtype === "m.file" && messageWithFile}
        {
          //@ts-ignore
          content.msgtype === "m.hedilink" && messageWithHediLink
        }

        <div className="statusDateRow">
          {event.isSending() ? (
            <div className="sending">
              <Hourglass16 />
            </div>
          ) : (
            <p className="hedi--msg-message--timestamp hedi--msg-message--delivery-status">
              {eventDate}
            </p>
          )}
          {read && (
            <div className={`read ${sender}`}>
              <CheckmarkFilled16 />
            </div>
          )}
        </div>
      </div>

      {showImageDetail && (
        <ImageDetail
          imageUrl={downloadUrl ?? ""}
          {...imageDetailDefinition}
          close={() => setShowImageDetail(false)}
        />
      )}
    </div>
  );
};
