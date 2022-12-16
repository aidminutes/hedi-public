import { TextArea, Button } from "@/modules/components";
import { useTextInput } from "@/modules/react/hooks";
import {
  Add24,
  CloseFilled20,
  SearchLocate24,
  Send24,
} from "@carbon/icons-react";
import { Form } from "carbon-components-react";
import { useRef, useState } from "react";
import { FileSharing } from "../../components/FileSharing";
import {
  IQuickSearchDefinition,
  QuickSearch,
} from "../../components/QuickSearch";
import { TimelineSuggestionEntry } from "../../components/TimelineSuggestionEntry";
import { useMatrixClient } from "../../context/MatrixClientContext";
import { createUrlPreview } from "../../request/createUrlPreview";
import { IMessageComposer } from "./types";

const HediRoutePreview = (props: {
  hediRoute: string;
  setHediRoute: (route: string) => void;
  quickSearchDefinition: IQuickSearchDefinition;
}) => {
  const { hediRoute, setHediRoute, quickSearchDefinition } = props;
  return (
    <div className="hediRoutePreviewWrapper">
      <div className="hediRoutePreview" onClick={() => setHediRoute("")}>
        <TimelineSuggestionEntry
          route={hediRoute}
          {...quickSearchDefinition.suggestionsDefinition
            .suggestionEntryDefinition}
        />
        <div className="deleteRoute">
          <CloseFilled20 />
        </div>
      </div>
    </div>
  );
};

//handle sending different things here
export const MessageComposer = (props: IMessageComposer) => {
  const { roomId, lang, setShowFileSharing, showFileSharing, ...rest } = props;
  const {
    quickSearchDefinition,
    fileSharingDefinition,
    quickSearchButton,
    textArea,
    sendButton,
    shareButton,
  } = rest;
  const client = useMatrixClient();
  const [text, handleText, setText] = useTextInput("");
  const [hediRoute, setHediRoute] = useState("");
  const [isSearchActive, setSearchActive] = useState(false);
  const oldText = useRef<String>("");

  //adjust Height for TextArea based on rows
  const adjustHeight = (el: any) => {
    if (oldText.current.length < text.length) {
      //more text
      el.style.height =
        Math.min(
          el.scrollHeight >= el.clientHeight ? el.scrollHeight : 60,
          120
        ) + "px";
    } else {
      //less text
      if (el.scrollHeight === el.clientHeight) {
        el.style.height = el.clientHeight - 40 + "px";
        if (el.scrollHeight > el.clientHeight) {
          el.style.height =
            Math.min(
              el.scrollHeight >= el.clientHeight ? el.scrollHeight : 60,
              120
            ) + "px";
        }
      }
    }
    oldText.current = el.value;
  };

  const sendMessage = async () => {
    if (hediRoute) {
      await client.sendMessage(roomId, {
        body: hediRoute,
        msgtype: "m.hedilink",
      });
    } else if (text.trim()) {
      let body = text.trim();

      try {
        const urlPreview = await createUrlPreview(body);
        //@ts-ignore
        if (!!urlPreview && !!urlPreview.data && !!urlPreview.data.url) {
          //@ts-ignore
          body = JSON.stringify({ text: body, preview: urlPreview.data });
        }
      } catch (e) {
        console.error(e);
      }

      await client.sendTextMessage(roomId, body);
    }

    setText("");
    setHediRoute("");

    setSearchActive(false);

    const ta = document.getElementById("textAreaMessage");

    if (!!ta) {
      ta.style.height = "30px";
    }
  };

  return (
    <>
      <Form
        className="hedi--msg-message-composer"
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }}>
        {isSearchActive && (
          <QuickSearch
            lang={lang}
            onSelect={setHediRoute}
            {...quickSearchDefinition}
          />
        )}
        <Button
            buttonKind="ghost"
            className="quickSearch"
            hasIconOnly
            iconDescription={quickSearchDefinition.quickSearchLabel}
            renderIcon={() => <SearchLocate24 color=""/>}
            onClick={() => {
              setSearchActive(b => !b);
            }}
          />
        {hediRoute ? (
          <HediRoutePreview
            hediRoute={hediRoute}
            setHediRoute={setHediRoute}
            quickSearchDefinition={quickSearchDefinition}
          />
        ) : (
          <TextArea
            onKeyUp={e => adjustHeight(e.target)}
            onKeyPress={e => {
              if (e.which === 13 && !e.shiftKey) {
                e.preventDefault();

                sendMessage();
              }
            }}
            {...textArea}
            id={"textAreaMessage"}
            hideLabel
            className={"hedi--msg-message-composer--input-multi-line"}
            value={text}
            onChange={e => {
              client.sendTyping(roomId, true, 100);
              handleText(e);
            }}
          />
        )}
        <div
          className="shareButton"
          {...shareButton}
          onClick={() => setShowFileSharing(true)}>
          <Add24 />
        </div>
        <button className="sendButton" {...sendButton}>
          <Send24 />
        </button>
        {showFileSharing && (
          <FileSharing
            roomId={roomId}
            setShowFileSharing={(show: boolean) => setShowFileSharing(show)}
            {...fileSharingDefinition}
          />
        )}
      </Form>
    </>
  );
};
