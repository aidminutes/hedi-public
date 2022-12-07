import React from "react";
import { Column, Loading, Row } from "carbon-components-react";
import { IPage } from "@/modules/common/types";
import { useProfileUserCard } from "./useProfileUserCard";
import { transformProfileUserCard } from "./transformProfileUserCard";
import { getProfileUserCardDefinition } from "./getProfileUserCardDefinition";
import { LanguageSkill, UserTile } from "..";
import { Body, Image, Label, TextInput } from "@/modules/components";
import { ConsultationHoursView } from "./ConsultationHoursView";
import { InformationFilled16 } from "@carbon/icons-react";
import { ProfilePersonEditModal } from "./ProfilePersonEditModal";
import { ProfileContactEditModal } from "./ProfileContactEditModal";
import { ProfileAvailabilityEditModal } from "./ProfileAvailabilityEditModal";
import { ProfileImageEditModal } from "./ProfileImageEditModal";
import { ProfileLanguagesEditModal } from "../ProfileServices/ProfileLanguagesEditModal";
import { IProfile } from "@/modules/profile/types";
export const ProfileUserCard = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
}) => {
  const {
    midwifeHeadlineLabel,
    midwifeIntroText,
    personalHeadlineLabel,
    personalIntroText,
    userTilePersonStateLabel,
    userTilePersonHeadlineLabel,
    userTileAvailibilityEmptyStateLabel,
    userTileAvailabilityHeadlineLabel,
    userTileContactEmptyStateLabel,
    userTileContactHeadlineLabel,
    userTileImageEmptyStateLabel,
    userTileImageHeadlineLabel,
    name,
    city,
    street,
    email,
    website,
    phone,
    streetHintLabel,
    languagesDefinition,
  } = getProfileUserCardDefinition(content.components);
  const {
    myProfile,
    closePersonModal,
    handlePersonModal,
    handleContactModal,
    closeContactModal,
    availabilityAfterSaveHandler,
    personAfterSaveHandler,
    contactAfterSaveHandler,
    closeAvailabilityModal,
    handleAvailabilityModal,
    handleImageModal,
    closeImageModal,
    imageAfterSaveHandler,
    closeLanguagesModal,
    languagesAfterSaveHandler,
    handleLanguagesModal,
    isPersonModalOpen,
    isContactModalOpen,
    isAvailabilityModalOpen,
    isReloading,
    profileIsLoading,
    isImageModalOpen,
    isLanguagesEditOpen,
  } = useProfileUserCard(content.lang);

  const {
    compositeName,
    compositeCity,
    compositeStreet,
    compositeEmail,
    compositePhone,
    compositeWebsite,
    isUserTileTwoEmpty,
    isUserTileThreeEmpty,
    isUserTileFourEmpty,
    consultationHours,
    image,
    isMidwifeProfile,
    isPersonalProfile,
    isBusinessProfile,
  } = transformProfileUserCard(myProfile);

  return (
    <>
      <Row className="hedi--profile__info-area">
        <Column>
          {isMidwifeProfile && (
            <>
              <Label {...midwifeHeadlineLabel} />
              <Body {...midwifeIntroText} />
            </>
          )}
          {isPersonalProfile && (
            <>
              <Label {...personalHeadlineLabel} />
              <Body {...personalIntroText} />
            </>
          )}
        </Column>
      </Row>
      {isReloading || profileIsLoading ? (
        <Loading />
      ) : (
        <Row>
          {" "}
          <UserTile
            kind="Contact"
            contentHeadline={userTilePersonHeadlineLabel.text || ""}
            isEmpty={false}
            emptyStateText={userTilePersonStateLabel.text || ""}
            onEditClick={() => handlePersonModal()}>
            <>
              <div className="hedi--profile__info-item">
                <p className="hedi--profile__info-item-label">{name.text}</p>
                <p>{compositeName}</p>
              </div>
              <div className="hedi--profile__info-item">
                <p className="hedi--profile__info-item-label">{city.text}</p>
                <p>{compositeCity}</p>
              </div>
              <div className="hedi--profile__info-item">
                <p className="hedi--profile__info-item-label">
                  {street.text}{" "}
                  {isMidwifeProfile && (
                    <span className="hedi--profile__info-item-label--hint">
                      <InformationFilled16 /> {streetHintLabel.text}
                    </span>
                  )}
                </p>
                <p>{compositeStreet}</p>
              </div>
            </>
          </UserTile>
          <UserTile
            kind="Contact"
            contentHeadline={userTileContactHeadlineLabel.text || ""}
            isEmpty={isUserTileTwoEmpty}
            emptyStateText={userTileContactEmptyStateLabel.text || ""}
            onEditClick={() => handleContactModal()}>
            <div className="hedi--profile__info-item">
              <p className="hedi--profile__info-item-label">{email.text}</p>
              <p>{compositeEmail}</p>
            </div>
            {isBusinessProfile && (
              <div className="hedi--profile__info-item">
                <p className="hedi--profile__info-item-label">{website.text}</p>
                <p>{compositeWebsite}</p>
              </div>
            )}
            <div className="hedi--profile__info-item">
              <p className="hedi--profile__info-item-label">{phone.text}</p>
              <p>{compositePhone}</p>
            </div>
          </UserTile>
          {isBusinessProfile && (
            <UserTile
              kind="Availability"
              isEmpty={isUserTileThreeEmpty}
              emptyStateText={userTileAvailibilityEmptyStateLabel.text || ""}
              contentHeadline={userTileAvailabilityHeadlineLabel.text || ""}
              onEditClick={() => handleAvailabilityModal()}>
              {consultationHours && (
                <ConsultationHoursView elements={consultationHours} />
              )}
            </UserTile>
          )}
          {isPersonalProfile && (
            <UserTile
              isEmpty={!myProfile?.languageLevels?.length}
              emptyStateText={
                languagesDefinition.languagesPersonalEmptyStateLabel.text || ""
              }
              kind="Languages"
              contentHeadline={
                languagesDefinition.languagesTileLabel.text || ""
              }
              onEditClick={() => handleLanguagesModal()}>
              <table className="hedi--profile__services__language-skills">
                <tbody>
                  {myProfile?.languageLevels?.map((level, index) => (
                    <LanguageSkill
                      key={index + level.language.route}
                      languageLevel={level}
                      mode="vertical"
                    />
                  ))}
                </tbody>
              </table>
            </UserTile>
          )}
          <UserTile
            contentHeadline={userTileImageHeadlineLabel.text || ""}
            emptyStateText={userTileImageEmptyStateLabel.text || ""}
            isEmpty={isUserTileFourEmpty}
            kind="Avatar"
            onEditClick={() => handleImageModal()}>
            {image && (
              <div className="hedi--profile__image-container">
                <div className="hedi--profile__image">
                  {" "}
                  <Image {...image} />
                </div>
              </div>
            )}
          </UserTile>
        </Row>
      )}
      <ProfilePersonEditModal
        content={content}
        onClosePersonEdit={closePersonModal}
        onAfterSave={personAfterSaveHandler}
        isPersonEditOpen={isPersonModalOpen}
        profile={myProfile}
      />
      <ProfileContactEditModal
        content={content}
        onCloseContactEdit={closeContactModal}
        onAfterSave={contactAfterSaveHandler}
        isContactEditOpen={isContactModalOpen}
        profile={myProfile}
      />
      <ProfileAvailabilityEditModal
        content={content}
        profile={myProfile}
        onCloseAvailabilityEdit={closeAvailabilityModal}
        onAfterSave={availabilityAfterSaveHandler}
        isAvailabilityEditOpen={isAvailabilityModalOpen}
      />
      <ProfileLanguagesEditModal
        {...{
          content,
          profile: myProfile as IProfile,
          isLanguagesEditOpen,
          onClose: closeLanguagesModal,
          onSaveSuccess: languagesAfterSaveHandler,
        }}
      />

      {myProfile && (
        <ProfileImageEditModal
          content={content}
          profile={myProfile}
          onCloseImageEdit={closeImageModal}
          onAfterSave={imageAfterSaveHandler}
          isImageEditOpen={isImageModalOpen}
        />
      )}
    </>
  );
};
