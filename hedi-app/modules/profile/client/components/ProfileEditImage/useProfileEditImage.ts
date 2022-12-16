import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { IMutationResponse } from "@/modules/model";
import { IImage, uploadProfileImageAPIUrl } from "@/modules/media/types";
import path from "path";
import { RefObject, useState } from "react";
import { IImageUploadHandler } from "@/modules/media/client/components/imageUpload/ImageUpload";
import { UserProfile } from "@/modules/profile/types";

export const useProfileEditImage = ({
  lang,
  validFileExtensions,
  profile,
  imageUploadRef,
  onAfterSave,
}: {
  lang: string;
  validFileExtensions: string[];
  profile: UserProfile;
  imageUploadRef: RefObject<IImageUploadHandler>;
  onAfterSave?: () => void;
}) => {
  const successRedirectTimeout = 1500;
  const [imageLocalUrl, setImageLocalUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [isMarkedToBeDeleted, setIsMarkedToBeDeleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isInvalidFile, setIsInvalidFile] = useState(false);
  const [myProfileImage, setMyProfileImage] = useState<null | IImage>(
    profile.image || null
  );
  const [isSucceed, setIsSucceed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isDeleteImageFailed, setIsDeleteImageFailed] = useState(false);
  const maxWidth = 300, // TODO where to set these?
    maxHeight = 300;

  const [isFileAdded, setIsFileAdded] = useState(false);

  const fileChanged = (filename: string, file: File) => {
    const filenameparts = filename.split(/[\\\/]/);
    setFilename(filenameparts[filenameparts.length - 1]);
    const fileExtension = path.extname(filenameparts[filenameparts.length - 1]);
    if (!validFileExtensions.includes(fileExtension)) {
      setIsInvalidFile(true);
      return;
    }
    setIsInvalidFile(false);
    setImageLocalUrl(URL.createObjectURL(file));
    setShowPreview(true);
  };

  const handleFileAdded = function (
    e: React.DragEvent<HTMLElement>,
    content: { addedFiles: File[] }
  ) {
    fileChanged(content.addedFiles[0].name, content.addedFiles[0]);
    setIsFileAdded(true);
  };

  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    fileChanged(e.target.value, fileList[0]);
    setIsFileAdded(true);
  };

  const handleCancel = () => {
    setIsFileAdded(false);
    resetStates();
    // router.push(profileHref);
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (isMarkedToBeDeleted) {
      const succeed = await deleteImage();
      setIsSaving(false);
      if (succeed) {
        setIsMarkedToBeDeleted(false);
        if (onAfterSave) onAfterSave();
      }
    } else {
      if (imageUploadRef.current) {
        imageUploadRef.current?.handleUploadCropedImage()?.then(result => {
          setIsSaving(false);
          if (result.success && onAfterSave) onAfterSave();
        });
      } else {
        setIsSaving(false);
        if (onAfterSave) onAfterSave();
      }
    }
  };

  const resetStates = () => {
    setShowPreview(false);
    setImageLocalUrl("");
    setFilename("");
    setIsInvalidFile(false);
    setIsSucceed(false);
    setIsFailed(false);
    setIsMarkedToBeDeleted(false);
    if (profile?.image) setMyProfileImage(profile.image);
  };
  const handleSelectAnotherImage = () => {
    resetStates();
  };

  const handleUploadSuccess = () => {
    setIsSucceed(true);
    setIsFailed(false);
    setIsFileAdded(false);
    // setTimeout(() => {
    //   router.push(profileHref);
    // }, successRedirectTimeout);
  };

  const handleUploadFailure = (error: string) => {
    setIsFailed(true);
    setIsSucceed(false);
  };

  const handleDeleteImage = () => {
    setIsMarkedToBeDeleted(true);
    setMyProfileImage(null);
  };

  const deleteImage = async () => {
    const formData = new FormData();
    formData.append("route", profile.route ?? "");
    return fetch(uploadProfileImageAPIUrl, {
      method: "post",
      body: formData,
    })
      .then(res => res.json())
      .then(response => {
        const result: IMutationResponse | IHTTPError = response;
        if (IsIHTTPError(result)) {
          setIsDeleteImageFailed(true);
        } else {
          if (result.success) {
            setIsDeleteImageFailed(false);
          }
          if (!result.success) setIsDeleteImageFailed(true);
        }
        return !IsIHTTPError(result) && result.success;
      })
      .catch(error => {
        setIsDeleteImageFailed(true);
        return false;
      });
  };

  return {
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
  };
};
