import { Body, Label } from "@/modules/components/client";
import { CodeSnippet, Column, Row, Tile } from "carbon-components-react";
import { useMatrixClient } from "../../../context/MatrixClientContext";
import { Admin } from "../Admin";
import { RoomList } from "../../RoomList";
import { IRoomsView } from "./types";
import { useState } from "react";

// NOTE dev / page structure demo only, not for production

export const RoomsView = ({ content }: { content: IRoomsView }) => {
  const client = useMatrixClient();

  const { lang, headline, body, roomListDefinition } = content;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Row>
        <Column>
          <Label {...headline} />
          <div className="hedi--rooms-view__intro-text mb-07">
            <Body {...body} />
          </div>
        </Column>
      </Row>
      {/* <Row>
        <Column md={1}>
          <Tile>{isLoggedIn ? "logged_in" : "not logged in"}</Tile>
        </Column>
        <Column md={2}>
          <CodeSnippet>{client.credentials.userId}</CodeSnippet>
        </Column>
      </Row> */}
      <Row>
        <Column>
          <RoomList
            locale={lang}
            setIsLoggedIn={setIsLoggedIn}
            {...roomListDefinition}
          />
        </Column>
      </Row>
      {/* <hr />
      <Row>
        <Column>
          <Admin />
        </Column>
      </Row> */}
    </>
  );
};
