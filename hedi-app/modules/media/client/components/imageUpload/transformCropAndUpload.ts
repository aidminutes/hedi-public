import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { ErrorMap, IMutationResponse } from "@/modules/model";
import { uploadProfileImageAPIUrl } from "@/modules/media/types";
import React from "react";
import { getImageMimeType, getScaled } from "./imageUtils";

const uploadCropedImage = (
  cropContainerRef: React.RefObject<HTMLDivElement>,
  previewContainerRef: React.RefObject<HTMLDivElement>,
  imgRef: React.RefObject<HTMLImageElement>,
  cropboxRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  maxWidth: number,
  maxHeight: number,
  filename: string,
  uuid: string,
  onSuccess?: () => void,
  onFailure?: (error: string) => void
): Promise<IMutationResponse> => {
  return new Promise<IMutationResponse>((resolve, reject) => {
    if (
      previewContainerRef.current &&
      imgRef.current &&
      cropboxRef.current &&
      canvasRef.current
    ) {
      const resizeRatio = cropContainerRef.current
        ? imgRef.current.naturalWidth /
          previewContainerRef.current.getBoundingClientRect().width
        : 1;
      const realLeft = parseInt(
        (
          (cropboxRef.current.getBoundingClientRect().left -
            previewContainerRef.current.getBoundingClientRect().left) *
          resizeRatio
        ).toFixed()
      );
      const realTop = parseInt(
        (
          (cropboxRef.current.getBoundingClientRect().top -
            previewContainerRef.current.getBoundingClientRect().top) *
          resizeRatio
        ).toFixed()
      );
      const realWidth = parseInt(
        (
          cropboxRef.current.getBoundingClientRect().width * resizeRatio
        ).toFixed()
      );
      const realHeight = parseInt(
        (
          cropboxRef.current.getBoundingClientRect().height * resizeRatio
        ).toFixed()
      );

      const { scaledWidth, scaledHeight } = getScaled(
        realWidth,
        realHeight,
        maxWidth,
        maxHeight
      );

      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = scaledWidth;
      canvasRef.current.height = scaledHeight;

      ctx?.drawImage(
        imgRef.current,
        realLeft,
        realTop,
        realWidth,
        realHeight,
        0,
        0,
        scaledWidth,
        scaledHeight
      );

      canvasRef.current.toBlob(blob => {
        if (blob) {
          var formData = new FormData();
          formData.append("image", blob, filename);
          formData.append("uuid", uuid);

          fetch(uploadProfileImageAPIUrl, {
            method: "post",
            body: formData,
          })
            .then(res => res.json())
            .then(response => {
              const result: IMutationResponse | IHTTPError = response;
              if (IsIHTTPError(result)) {
                if (onFailure) onFailure(result.message ?? "Error");
              } else {
                if (result.success && onSuccess) onSuccess();
                if (!result.success && onFailure)
                  onFailure((result.errors as ErrorMap)?.generic ?? "Error");
              }
              resolve(
                IsIHTTPError(result)
                  ? { success: false, errors: { generic: result.message } }
                  : result
              );
            })
            .catch(error => {
              if (onFailure) onFailure(error);
              resolve({ success: false });
            });
        }
      }, getImageMimeType(filename));
    }
  });
};

export const transformCropAndUpload = (
  cropContainerRef: React.RefObject<HTMLDivElement>,
  previewContainerRef: React.RefObject<HTMLDivElement>,
  imgRef: React.RefObject<HTMLImageElement>,
  cropboxRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  maxWidth: number,
  maxHeight: number,
  filename: string,
  uuid: string,
  onSuccess?: () => void,
  onFailure?: (error: string) => void
) => {
  const handleUploadCropedImage = async () =>
    uploadCropedImage(
      cropContainerRef,
      previewContainerRef,
      imgRef,
      cropboxRef,
      canvasRef,
      maxWidth,
      maxHeight,
      filename,
      uuid,
      onSuccess,
      onFailure
    );

  return {
    handleUploadCropedImage,
  };
};
