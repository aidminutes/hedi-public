import { IPage } from "@/modules/common/types";
import { Body, IBodyComponent, Label } from "@/modules/components";
import { OwnerProfile } from "@/modules/networking/types/IMidwifeCareRequestOwner";
import { Column, InlineLoading, Modal, Row } from "carbon-components-react";
import React, { useMemo, useState } from "react";
import { Image } from "@/modules/components";

import { getTransitionModalDefinition } from "./getTransitionModalDefinition";
import { HediPersonRound } from "@/modules/svg";
import { ITransition } from "@/modules/model";
import { IConnectionProfile } from "@/modules/networking/types";

export const TransitionModal = ({
  content,
  handleSubmit,
  owner,
  currentState,
  transition,
  isModalLoading,
  isModalOpen,
  onCloseModal,
  onAfterSave,
}: {
  content: Pick<IPage, "lang" | "components">;
  handleSubmit: () => void;
  owner: OwnerProfile | IConnectionProfile;
  currentState: string;
  transition: ITransition;
  isModalLoading: boolean;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onAfterSave?: () => void;
}) => {
  if (!isModalOpen) return null;

  const {
    sendCommitmentHeader,
    sendCommitmentBody,
    sendCommitmentButton,
    cancelButton,
    sendCancellationHeader,
    sendCancellationBody,
    sendCancellationBody_alreadyCommitted,
    sendCancellationButton,
    sendWithdrawnBody,
    sendWithdrawnButton,
    sendWithdrawnHeader,
    sendConfirmBody,
    sendConfirmButton,
    sendConfirmHeader,
    sendConfirmSecondaryButton,
    sendCancelBody,
    sendCancelButton,
    sendCancelHeader,
    sendRecipientCompleteBody,
    sendRecipientCompleteButton,
    sendRecipientCompleteHeader,
    sendRecipientCareCancelBody,
    sendRecipientCareCancelButton,
    sendRecipientCareCancelHeader,
    sendSenderCareCancelBody,
    sendSenderCareCancelHeader,
  } = getTransitionModalDefinition(content.components);

  interface ITextList {
    header: string;
    body: IBodyComponent;
    sendButton: string;
    secondaryButton?: string;
  }

  const getAllTexts = (): ITextList => {
    if (transition.route === "midwife_care_connection.recipient_handshake")
      return {
        header: sendCommitmentHeader.text || "",
        body: sendCommitmentBody,
        sendButton: sendCommitmentButton.labelText || "",
        secondaryButton: sendConfirmSecondaryButton.labelText || "",
      };
    if (
      (currentState === "midwife_care_connection.read" ||
        currentState === "midwife_care_connection.unread") &&
      transition.route === "midwife_care_connection.recipient_reject"
    )
      return {
        header: sendCancellationHeader.text || "",
        body: sendCancellationBody,
        sendButton: sendCancellationButton.labelText || "",
      };
    if (
      currentState === "midwife_care_connection.handshaking" &&
      transition.route === "midwife_care_connection.recipient_reject"
    )
      return {
        header: sendCancellationHeader.text || "",
        body: sendCancellationBody_alreadyCommitted,
        sendButton: sendCancellationButton.labelText || "",
      };
    if (
      transition.route === "midwife_care_connection.sender_withdraw" ||
      (transition.route === "midwife_care_connection.sender_cancel" &&
        currentState === "midwife_care_connection.tentative")
    )
      return {
        header: sendWithdrawnHeader.text || "",
        body: sendWithdrawnBody,
        sendButton: sendWithdrawnButton.labelText || "",
      };
    if (transition.route === "midwife_care_connection.sender_confirm")
      return {
        header: sendConfirmHeader.text || "",
        body: sendConfirmBody,
        sendButton: sendConfirmButton.labelText || "",
        secondaryButton: sendConfirmSecondaryButton.labelText || "",
      };
    if (
      transition.route === "midwife_care_connection.sender_dismiss" ||
      transition.route === "midwife_care_connection.sender_cancel" ||
      transition.route === "midwife_care_connection.sender_withdraw"
    )
      return {
        header: sendCancelHeader.text || "",
        body: sendCancelBody,
        sendButton: sendCancelButton.labelText || "",
      };
    if (transition.route === "midwife_care_connection.recipient_complete")
      return {
        header: sendRecipientCompleteHeader.text || "",
        body: sendRecipientCompleteBody,
        sendButton: sendRecipientCompleteButton.labelText || "",
        secondaryButton: sendConfirmSecondaryButton.labelText || "",
      };
    if (transition.route === "midwife_care_connection.recipient_care_cancel")
      return {
        header: sendRecipientCareCancelHeader.text || "",
        body: sendRecipientCareCancelBody,
        sendButton: sendRecipientCareCancelButton.labelText || "",
      };

    if (transition.route === "midwife_care_connection.sender_care_cancel")
      return {
        header: sendSenderCareCancelHeader.text || "",
        body: sendSenderCareCancelBody,
        sendButton: sendRecipientCareCancelButton.labelText || "",
        secondaryButton: sendConfirmSecondaryButton.labelText || "",
      };

    return {
      header: "",
      body: { kind: "Body", body: "" },
      sendButton: "",
    };
  };
  const { header, body, sendButton, secondaryButton } = getAllTexts();
  return (
    <Modal
      primaryButtonDisabled={isModalLoading}
      modalHeading={header}
      size="md"
      open={true}
      onRequestClose={() => {
        onCloseModal();
      }}
      primaryButtonText={isModalLoading ? <InlineLoading /> : sendButton}
      secondaryButtonText={secondaryButton || cancelButton.text}
      onSecondarySubmit={() => onCloseModal()}
      onRequestSubmit={() => handleSubmit()}
      className="hedi--person-edit hedi--profile-edit-modal">
      <>
        <Row>
          <Column {...{ sm: 4, md: 8, lg: 16 }}>
            <div className="hedi--profile-edit-modal__intro-text">
              <Body {...body} />
            </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <div className="hedi--profile-card__user-area">
              <div className="hedi--profile-card__image-small">
                {owner.image ? <Image {...owner.image} /> : <HediPersonRound />}
              </div>
              <div className="hedi--profile-card__user-name">
                {`${owner.label}`}
              </div>
            </div>
          </Column>
        </Row>
      </>
    </Modal>
  );
};
