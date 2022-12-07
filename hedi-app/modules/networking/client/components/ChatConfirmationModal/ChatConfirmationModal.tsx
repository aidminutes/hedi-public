import { IPage } from "@/modules/common/types";
import { OwnerProfile } from "@/modules/networking/types/IMidwifeCareRequestOwner";
import { Column, Modal, Row } from "carbon-components-react";

import { IConnectionProfile } from "@/modules/networking/types";
import { getChatConfirmationModalDefinition } from "./getChatConfirmationModalDefinition";
import { Body, Image } from "@/modules/components";
import { HediPersonRound } from "@/modules/svg";

export const ChatConfirmationModal = ({
  content,
  handleConfirmation,
  owner,
  isModalOpen,
  onCloseModal,
  onAfterSave,
}: {
  content: Pick<IPage, "lang" | "components">;
  handleConfirmation: () => void;
  owner: OwnerProfile | IConnectionProfile;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onAfterSave?: () => void;
}) => {
  if (!isModalOpen) return null;

  const {
    chatConfirmationHeader,
    chatConfirmationBody,
    chatConfirmationOkButton,
    chatConfirmationCancelButton,
  } = getChatConfirmationModalDefinition(content.components);

  return (
    <Modal
      primaryButtonDisabled={false}
      modalHeading={chatConfirmationHeader.text}
      size="md"
      open={true}
      onRequestClose={() => {
        onCloseModal();
      }}
      primaryButtonText={chatConfirmationOkButton.labelText}
      secondaryButtonText={chatConfirmationCancelButton.labelText}
      onSecondarySubmit={() => onCloseModal()}
      onRequestSubmit={() => handleConfirmation()}
      className="hedi--person-edit hedi--profile-edit-modal">
      <>
        <Row>
          <Column {...{ sm: 4, md: 8, lg: 16 }}>
            <div className="hedi--profile-edit-modal__intro-text">
              <Body {...chatConfirmationBody} />
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
