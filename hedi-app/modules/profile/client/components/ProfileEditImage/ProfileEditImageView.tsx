import {
  Column,
  ButtonKind,
  FileUploaderDropContainer,
  FileUploader,
  Row,
  FileUploaderItem,
} from "carbon-components-react";
import { Image, Label, ToastNotification } from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { Button } from "@/modules/components";
import { getProfileEditImageViewDefinition } from "./getProfileEditImageViewDefinition";
import { IImageUploadHandler, ImageUpload } from "@/modules/media/client";
import { useRouter } from "next/router";
import { useProfileEditImage } from "./useProfileEditImage";
import { HediPersonRound } from "@/modules/svg";
import { RefObject, useRef } from "react";
import { useUser } from "@/modules/auth/client/hooks";
import { useMyProfile } from "../../hooks";
import { UserProfile } from "@/modules/profile/types";
export const validImageExtensions = [".jpg", ".png", ".jpeg", ".JPG", ".PNG", ".JPEG"];

export const ProfileEditImageView = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
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
    editProfileLink,
  } = getProfileEditImageViewDefinition(content.components);
  const [user, userIsLoading] = useUser();
  const [myProfile, myProfileIsLoading] = useMyProfile(user, content.lang);


  const imageUploadRef = useRef() as RefObject<IImageUploadHandler>;

  const {
    filename,
    imageLocalUrl,
    showPreview,
    maxWidth,
    maxHeight,
    isInvalidFile,
    myProfileImage,
    isSucceed,
    isFailed,
    isDeleteImageFailed,
    handleFileAdded,
    handleSelectAnotherImage,
    handleFileChange,
    handleUploadSuccess,
    handleUploadFailure,
    handleCancel,
    handleDeleteImage,
  } = useProfileEditImage({
    lang: content.lang,
    validFileExtensions: validImageExtensions,
    profile: myProfile || ({} as UserProfile),
    imageUploadRef,
  });
  const router = useRouter();
  const columnWidthSpec = { lg: 8, md: 6, sm: 4 };
  const invalidFileColumnWidthSpec = { lg: 6, md: 4, sm: 3 };

  return (
    <>
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
                    // <Image {...defaultImageMedia} />
                    <div className="hedi--profile-image-upload__default">
                      <HediPersonRound />
                    </div>
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
    </>
  );
};
