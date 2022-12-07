import { IPage } from "@/modules/common/types";
import { Button, Label, ToastNotification, Image } from "@/modules/components";
import { ImageUpload, IImageUploadHandler } from "@/modules/media/client";
import { UserProfile } from "@/modules/profile/types";
import { HediPersonRound } from "@/modules/svg";
import {
  ButtonKind,
  Column,
  FileUploader,
  FileUploaderDropContainer,
  FileUploaderItem,
  Row,
} from "carbon-components-react";
import React, { RefObject, useEffect, useRef } from "react";
import { getProfileEditImageViewDefinition } from "../../ProfileEditImage/getProfileEditImageViewDefinition";
import { useProfileEditImage } from "../../ProfileEditImage/useProfileEditImage";
import { validImageExtensions } from "../../ProfileEditImage";

export const ProfileImageEdit = ({
  content,
  profile,
  onCloseImageEdit,
  onAfterSave,
  setIsSavingImage,
  saveSignal,
  resetSignal,
  setIsValid,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard">;
  profile: UserProfile;
  onCloseImageEdit?: () => void;
  onAfterSave?: () => void;
  setIsSavingImage?: (isSaving: boolean) => void;
  saveSignal?: number;
  resetSignal?: number;
  setIsValid?: (isValid: boolean) => void;
}) => {
  const {
    newProfileImageLabel,
    backToProfileButton,
    uploadImageButton,
    cancelButton,
    cropperHelpLabel,
    currentImageLabel,
    deleteImageButton,
    deleteImageFailureNotification,
    selectImageDropboxButton,
    selectImageFileUploaderButton,
    selectAnotherImageButton,
    invalidFileNotification,
    successNotification,
    failureNotification,
  } = getProfileEditImageViewDefinition(content.components);

  const imageUploadRef = useRef() as RefObject<IImageUploadHandler>;
  const {
    filename,
    imageLocalUrl,
    showPreview,
    isInvalidFile,
    maxWidth,
    maxHeight,
    myProfileImage,
    isSucceed,
    isFailed,
    isDeleteImageFailed,
    isFileAdded,
    isMarkedToBeDeleted,
    isSaving,
    handleFileAdded,
    handleFileChange,
    handleUploadSuccess,
    handleUploadFailure,
    handleCancel,
    handleDeleteImage,
    handleSelectAnotherImage,
    handleSave,
  } = useProfileEditImage({
    lang: content.lang,
    validFileExtensions: validImageExtensions,
    profile,
    imageUploadRef,
    onAfterSave,
  });

  useEffect(() => {
    if (setIsSavingImage) setIsSavingImage(isSaving);
  }, [isSaving]);

  useEffect(() => {
    if (resetSignal && resetSignal > 0) {
      handleCancel();
    }
  }, [resetSignal]);

  useEffect(() => {
    if (saveSignal && saveSignal > 0) {
      handleSave();
    }
  }, [saveSignal]);

  useEffect(() => {
    if (setIsValid) setIsValid(isFileAdded || isMarkedToBeDeleted);
  }, [isFileAdded, isMarkedToBeDeleted]);

  const columnWidthSpec = { lg: 8, md: 6, sm: 4 };
  const invalidFileColumnWidthSpec = { lg: 6, md: 4, sm: 3 };

  return (
    <>
      <Column {...{ sm: 4, md: 8, lg: 16 }}>
        <div className="hedi--profile-image-upload">
          {!showPreview && !isInvalidFile && (
            <>
              <div className="hedi--profile-image-upload__current">
                <Row>
                  <Column>
                    <Label {...currentImageLabel} />
                  </Column>
                </Row>
                <Row>
                  <Column {...columnWidthSpec}>
                    {myProfileImage ? (
                      <Image {...myProfileImage} />
                    ) : (
                      <div className="hedi--profile-image-upload__default">
                        <HediPersonRound />
                      </div>
                      // <Image {...defaultImageMedia} />
                    )}
                  </Column>
                </Row>
                {myProfileImage && (
                  <Row>
                    <Column>
                      <Button
                        {...deleteImageButton}
                        onClick={() => handleDeleteImage()}
                      />
                    </Column>
                  </Row>
                )}
                {isDeleteImageFailed && (
                  <Row>
                    <Column {...columnWidthSpec}>
                      <div className="hedi--profile-image-upload__success-and-error-container">
                        <ToastNotification
                          {...deleteImageFailureNotification}
                          hideCloseButton={false}
                        />
                      </div>
                    </Column>
                  </Row>
                )}
              </div>
              <div className="hedi--profile-image-upload__new-profile-image">
                <Row>
                  <Column>
                    <Label {...newProfileImageLabel} />
                  </Column>
                </Row>
              </div>
              <Row>
                <Column {...columnWidthSpec}>
                  <div className="hedi--profile-image-file-drop-container">
                    <FileUploaderDropContainer
                      accept={validImageExtensions}
                      labelText={selectImageDropboxButton.text}
                      onAddFiles={handleFileAdded}
                    />
                  </div>
                  <div className="hedi--profile-image-file-uploader-button">
                    <FileUploader
                      accept={validImageExtensions}
                      buttonKind={
                        selectImageFileUploaderButton.buttonKind as ButtonKind
                      }
                      buttonLabel={selectImageFileUploaderButton.text}
                      onChange={handleFileChange}
                    />
                  </div>
                </Column>
              </Row>
            </>
          )}

          {isInvalidFile && (
            <>
              <div className="hedi--profile-image-upload__invalid-file">
                <Row>
                  <Column {...invalidFileColumnWidthSpec}>
                    <FileUploaderItem
                      name={filename}
                      status="edit"
                      invalid={true}
                      errorSubject={invalidFileNotification.title}
                      errorBody={invalidFileNotification.subtitle}
                    />
                  </Column>
                </Row>
              </div>
              <Row>
                <Column {...invalidFileColumnWidthSpec}>
                  <div className="hedi--profile-image-upload__invalid-file-buttons">
                    {/* <Button {...cancelButton} onClick={handleCancel} /> */}
                    <Button
                      {...selectAnotherImageButton}
                      onClick={handleSelectAnotherImage}
                      buttonKind="primary"
                    />
                  </div>
                </Column>
              </Row>
            </>
          )}
          {showPreview && (
            <>
              <Row className="hedi--profile-image-upload__helptext">
                <Column>
                  <Label {...cropperHelpLabel} />
                </Column>
              </Row>
              <Row>
                <Column>
                  <ImageUpload
                    ratio={1}
                    uploadImageButton={uploadImageButton}
                    selectAnotherImageButton={selectAnotherImageButton}
                    onSelectAnotherImage={handleSelectAnotherImage}
                    cancelButton={cancelButton}
                    imageLocalUrl={imageLocalUrl}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    filename={filename}
                    onSuccess={handleUploadSuccess}
                    onFailure={handleUploadFailure}
                    onCancel={handleCancel}
                    ref={imageUploadRef}
                  />
                </Column>
              </Row>
              {(isSucceed || isFailed) && (
                <Row>
                  <Column {...columnWidthSpec}>
                    <div className="hedi--profile-image-upload__success-and-error-container">
                      {isSucceed && (
                        <ToastNotification
                          {...successNotification}
                          subtitle={
                            (successNotification.subtitle ?? "") +
                            `<a href="${backToProfileButton.href}">
                        ${backToProfileButton.text}
                      </a>`
                          }
                          hideCloseButton={false}
                        />
                      )}
                      {isFailed && (
                        <ToastNotification
                          {...failureNotification}
                          hideCloseButton={false}
                        />
                      )}
                    </div>
                  </Column>
                </Row>
              )}
            </>
          )}
        </div>
      </Column>
    </>
  );
};
