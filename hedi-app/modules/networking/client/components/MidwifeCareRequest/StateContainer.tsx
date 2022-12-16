import { Button, ILabelComponent, Label } from "@/modules/components";
import { Column, Row } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import { Chat16 } from "@carbon/icons-react";
import { IPage } from "@/modules/common/types";
import { getStateContainerDefinition } from "./getStateContainerDefinition";
import { CustomState } from "./useMidwifeCareRequestView";
import { StateTag } from "../StateTag";
import {
  isChattingAllowed,
  openChatRoomUsingRouter,
} from "@/modules/networking/utils/connections";
import { IMidwifeCareConnection } from "@/modules/networking/types";
import { useRouter } from "next/router";
import { ChatConfirmationModal } from "../ChatConfirmationModal/ChatConfirmationModal";

export const StateContainer = ({
  content,
  connection,
  changed,
  customState,
  isPersonal,
}: {
  content: IPage;
  connection?: IMidwifeCareConnection;
  changed: Date;
  customState: CustomState;
  isPersonal: boolean;
}) => {
  const {
    sendMessageButton,
    stateOpenHint,
    stateAcceptedHint,
    stateCancelledHint,
    sinceLabel,
    stateOpenPersonalHint,
    stateAcceptedPersonalHint,
    stateCancelledPersonalHint,
    openStateLabel,
    stateActiveHintMidwife,
    stateActiveHintPersonal,
    conversationLink,
  } = getStateContainerDefinition(content.components);
  const router = useRouter();

  const [isChatRoomModalOpen, setIsChatRoomModalOpen] = useState(false);
  const [isChatStartConfirmed, setIsChatStartConfirmed] = useState(false);
  const handleConfirmation = () => {
    setIsChatRoomModalOpen(false);
    setIsChatStartConfirmed(true);
  };
  useEffect(() => {
    if (isChatStartConfirmed && connection) {
      openChatRoom(false);
    }
  }, [isChatStartConfirmed, connection]);

  const openChatRoom = (showConfirmation: boolean) => {
    if (!connection) return;
    if (showConfirmation) {
      setIsChatRoomModalOpen(true);
      return;
    }

    openChatRoomUsingRouter(
      router,
      connection,
      conversationLink.href,
      isPersonal
    ).catch(err => {
      console.log("Error: ", err);
    });
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };

  const emptyHint: ILabelComponent = { labelKind: "p", kind: "Label" };

  let label: ILabelComponent;
  switch (customState) {
    case "open":
      label = isPersonal ? stateOpenPersonalHint : stateOpenHint;
      break;
    case "handshaking":
      label = isPersonal ? stateAcceptedPersonalHint : stateAcceptedHint;
      break;
    case "dismissed":
      label = isPersonal ? stateCancelledPersonalHint : stateCancelledHint;
      break;
    case "active":
      label = isPersonal ? stateActiveHintPersonal : stateActiveHintMidwife;
      break;
    case "completed":
      label = emptyHint;
      break;
    default:
      label = emptyHint;
  }

  return (
    <Row>
      <Column>
        <div className="hedi--midwife-care-request-view__state-container">
          <div>
            {connection && connection.state && (
              <StateTag state={connection.state}>
                {isPersonal && connection.state.route.includes("unread")
                  ? openStateLabel.text
                  : connection.state.label}
              </StateTag>
            )}
            <p className="hedi--midwife-care-request-view__updated">
              <Label {...sinceLabel} />{" "}
              {new Date(changed).toLocaleDateString(content.lang, dateOptions)}
            </p>
            <Label {...label} />
          </div>
          <div>
            <Button
              {...sendMessageButton}
              renderIcon={Chat16}
              disabled={
                !connection ||
                !isChattingAllowed(connection?.state.route || "", isPersonal)
              }
              onClick={() => {
                if (connection) {
                  openChatRoom(
                    !isPersonal &&
                      (connection.state.route.endsWith(".read") ||
                        connection.state.route.endsWith("unread"))
                  );
                }
              }}
            />
          </div>
        </div>
      </Column>
      {connection ? (
        <ChatConfirmationModal
          {...{
            content,
            handleConfirmation,
            owner: isPersonal
              ? connection.recipient
              : connection.sender.ownerProfile,
            isModalOpen: isChatRoomModalOpen,
            onCloseModal: () => setIsChatRoomModalOpen(false),
          }}
        />
      ) : null}
    </Row>
  );
};
