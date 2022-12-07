import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Position } from "./types";
import { transformCropper } from "./transformCropper";
import { transformCropAndUpload } from "./transformCropAndUpload";
import { Button, IButtonComponent } from "@/modules/components";
import { useImageUpload } from "./useImageUpload";
import { Column, Row } from "carbon-components-react";
import { useUser } from "@/modules/auth/client/hooks";
import { IMutationResponse } from "@/modules/model/IMutationResponse";

interface IImageUploadProps {
  ratio?: number;
  uploadImageButton: IButtonComponent;
  cancelButton?: IButtonComponent;
  selectAnotherImageButton?: IButtonComponent;
  imageLocalUrl: string;
  maxWidth: number;
  maxHeight: number;
  filename: string;
  onSuccess?: () => void;
  onFailure?: (error: string) => void;
  onCancel?: () => void;
  onSelectAnotherImage?: () => void;
  isModalSubmitting?: boolean;
  setIsModalSubmitting?: Function;
}
export type IImageUploadHandler = {
  handleUploadCropedImage: () => Promise<IMutationResponse>;
};

export const ImageUpload = forwardRef<IImageUploadHandler, IImageUploadProps>(
  (props: IImageUploadProps, ref) => {
    const {
      uploadImageButton,
      cancelButton,
      selectAnotherImageButton,
      imageLocalUrl,
      maxWidth,
      maxHeight,
      filename,
      ratio,
      onSuccess,
      onFailure,
      onCancel,
      onSelectAnotherImage,
    } = props;

    const cropContainerRef = useRef<HTMLDivElement>(null);
    const cropboxRef = useRef<HTMLDivElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const { cropboxRect, handleImageOnLoad } = useImageUpload(
      previewContainerRef,
      cropboxRef,
      ratio
    );
    const [user, userIsLoading] = useUser();

    const {
      handleContainerMouseLeave,
      handleContainerTouchEnd,
      handleContainerMouseUp,
      handleContainerMouseMove,
      handleContainerTouchMove,
      handleCropBoxTouchStart,
      handleCropBoxMouseDown,
      handleCropBoxTouchMove,
      handleCropBoxMouseMove,
      handleAdjusterTouchStart,
      handleAdjusterMouseDown,
    } = transformCropper(
      cropContainerRef,
      cropboxRef,
      previewContainerRef,
      cropboxRect,
      ratio
    );
    const { handleUploadCropedImage } = transformCropAndUpload(
      cropContainerRef,
      previewContainerRef,
      imgRef,
      cropboxRef,
      canvasRef,
      maxWidth,
      maxHeight,
      filename,
      user?.uuid || "",
      onSuccess,
      onFailure
    );
    useImperativeHandle(
      ref,
      () => ({
        handleUploadCropedImage,
      }),
      []
    );

    const columnWidthSpecs = { lg: 8, md: 6, sm: 4 };
    return imageLocalUrl ? (
      <>
        <Row>
          <Column {...columnWidthSpecs}>
            <canvas ref={canvasRef} hidden></canvas>
            <img src={imageLocalUrl} ref={imgRef} hidden />
            <div
              className="hedi--image-upload--preview-container"
              ref={previewContainerRef}
              onTouchEnd={handleContainerTouchEnd}
              onMouseUp={handleContainerMouseUp}
              onMouseMove={handleContainerMouseMove}
              onTouchMove={handleContainerTouchMove}
              onMouseLeave={handleContainerMouseLeave}>
              <img
                src={imageLocalUrl}
                className="hedi--image-upload--image-preview"
                onLoad={() => handleImageOnLoad()}
              />
              <div
                className="hedi--image-upload--crop-container"
                ref={cropContainerRef}>
                <div
                  className="hedi--image-upload--crop-box"
                  ref={cropboxRef}
                  style={{
                    top: cropboxRect.y,
                    left: cropboxRect.x,
                    width: cropboxRect.width,
                    height: cropboxRect.height,
                  }}
                  onTouchStart={handleCropBoxTouchStart}
                  onMouseDown={handleCropBoxMouseDown}
                  onTouchMove={handleCropBoxTouchMove}
                  onMouseMove={handleCropBoxMouseMove}>
                  <div className="hedi--image-upload--copy-of-preview-container">
                    {Object.keys(Position).map(prop => {
                      const key = Position[prop as keyof typeof Position];
                      return key == Position.NONE ? null : (
                        <div
                          key={key}
                          className={"hedi--image-cropper-adjuster " + key}
                          onTouchStart={e => handleAdjusterTouchStart(e, key)}
                          onMouseDown={e =>
                            handleAdjusterMouseDown(e, key)
                          }></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Column>
        </Row>
        <Row>
          <Column {...columnWidthSpecs}>
            <div className="hedi--image-upload__button-container">
              {/* {cancelButton && (
              <Button
                {...cancelButton}
                onClick={() => onCancel && onCancel()}
              />
            )} */}

              {/* <div>
              {selectAnotherImageButton && (
                <Button
                  {...selectAnotherImageButton}
                  onClick={e => onSelectAnotherImage && onSelectAnotherImage()}
                />
              )}
              <Button
                {...uploadImageButton}
                onClick={e => handleUploadCropedImage()}
              />
            </div> */}
            </div>
          </Column>
        </Row>
      </>
    ) : (
      <></>
    );
  }
);
